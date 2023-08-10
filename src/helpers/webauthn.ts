import { LitAuthClient, WebAuthnProvider } from "@lit-protocol/lit-auth-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ProviderType } from "@lit-protocol/constants";
import {
  AuthMethod,
  AuthCallbackParams,
  IRelayPollStatusResponse,
  IRelayPKP,
  SessionSigsMap,
} from "@lit-protocol/types";
import { LitAbility, LitActionResource } from "@lit-protocol/auth-helpers";
import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";
import {
  SimpleSmartContractAccount,
  SimpleSmartAccountOwner,
  Address,
  SignTypedDataParams,
  SendUserOperationResult,
} from "@alchemy/aa-core";
import { encodeFunctionData } from "viem";
import { IglooNFTABI } from "./IglooNFTABI";
import { TypedDataField } from "@ethersproject/abstract-signer";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { sendInitGas } from "./initGas";
import { LIT_RELAY_API_KEY } from "@/helpers/env";
import { CHAINS, Chain } from "./constants";

const IGLOONFT_TOKEN_GORLI_CONTRACT_ADDRESS =
  "0x799e75059126E6DA27A164d1315b1963Fb82c44F";

export const DEFAULT_EXP = new Date(
  Date.now() + 1000 * 60 * 60 * 24 * 7
).toISOString();

export class Passkey {
  public chain: Chain = CHAINS.goerli;
  public pkpPublicKey: string | undefined;
  public pkpEthAddress: string | undefined;
  public sessionSig: SessionSigsMap | undefined;

  private litAuthClient: LitAuthClient;
  private webAuthnProvider: WebAuthnProvider;
  private litNodeClient: LitNodeClient;

  constructor() {
    this.litAuthClient = new LitAuthClient({
      litRelayConfig: {
        relayApiKey: LIT_RELAY_API_KEY,
      },
    });
    this.litAuthClient.initProvider(ProviderType.WebAuthn);

    this.webAuthnProvider = this.litAuthClient.getProvider(
      ProviderType.WebAuthn
    ) as WebAuthnProvider;

    this.litNodeClient = new LitNodeClient({
      litNetwork: "serrano",
      debug: false,
    });
  }

  public async register(username: string): Promise<IRelayPollStatusResponse> {
    const options = await this.webAuthnProvider.register(username);

    const txHash = await this.webAuthnProvider.verifyAndMintPKPThroughRelayer(
      options
    );
    const response =
      await this.webAuthnProvider.relay.pollRequestUntilTerminalState(txHash);

    this.pkpPublicKey = response.pkpPublicKey;
    this.pkpEthAddress = response.pkpEthAddress;
    return response;
  }

  public async authenticate(): Promise<AuthMethod> {
    return await this.webAuthnProvider.authenticate();
  }

  public async fetchPkps(authMethod: AuthMethod): Promise<IRelayPKP[]> {
    const pkps = await this.webAuthnProvider.fetchPKPsThroughRelayer(
      authMethod
    );

    // todo: handle multiple pkps / eth addresses
    this.pkpPublicKey = pkps[0].publicKey;
    this.pkpEthAddress = pkps[0].ethAddress;
    return pkps;
  }

  public async getSessionSigs(
    pkpPublicKey: string,
    authData: AuthMethod,
    chain: Chain
  ): Promise<SessionSigsMap> {
    await this.litNodeClient.connect();

    if (this.pkpPublicKey == undefined || this.pkpEthAddress == undefined) {
      const pkp = await this.fetchPkps(authData);
      if (pkp.length === 0) {
        throw new Error("no pkp found");
      }
    }

    const authNeededCallback = async (params: AuthCallbackParams) => {
      const resp = await this.litNodeClient.signSessionKey({
        statement: params.statement,
        authMethods: [authData],
        pkpPublicKey: pkpPublicKey,
        expiration: params.expiration,
        resources: params.resources,
        chainId: chain.chainId,
      });
      return resp.authSig;
    };

    const changeChain = this.chain != chain;
    console.log("changeChain: ", changeChain);
    this.chain = chain;

    const sessionSigs = await this.litNodeClient.getSessionSigs({
      expiration: DEFAULT_EXP,
      chain: chain.name,
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LitAbility.PKPSigning,
        },
      ],
      switchChain: changeChain,
      authNeededCallback: authNeededCallback,
    });

    this.sessionSig = sessionSigs;

    return sessionSigs;
  }

  public async createPkpEthersWallet(
    pkpPublicKey: string
  ): Promise<PKPEthersWallet> {
    if (this.sessionSig === undefined || this.pkpEthAddress === undefined) {
      throw new Error("sessionSig or ethaddress is undefined");
    }

    await sendInitGas(this.getEthAddress() as Address, CHAINS.goerli);

    const pkpWallet = new PKPEthersWallet({
      controllerSessionSigs: this.sessionSig,
      pkpPubKey: pkpPublicKey,
      rpc: "https://chain-rpc.litprotocol.com/http",
    });
    await pkpWallet.init();

    return pkpWallet;
  }

  public async sendUserOperation(
    chain: Chain
  ): Promise<SendUserOperationResult> {
    // to do error states
    if (
      this.pkpPublicKey == undefined ||
      this.pkpEthAddress == undefined ||
      this.sessionSig == undefined
    ) {
      console.log("pkpPublicKey", this.pkpPublicKey);
      console.log("pkpEthAddress", this.pkpEthAddress);
      console.log("sessionSig", this.sessionSig);

      throw new Error(
        "authenticatedResponse is undefined or has no eth address"
      );
    }

    const pkpWallet = (await this.createPkpEthersWallet(
      this.pkpPublicKey
    )) as PKPEthersWallet;

    if (pkpWallet === undefined) {
      throw new Error("pkpWallet is undefined");
    }

    const owner: SimpleSmartAccountOwner = {
      signMessage: async (msg: Uint8Array) => {
        return (await pkpWallet.signMessage(msg)) as Address;
      },
      getAddress: async () => {
        return this.pkpEthAddress as Address;
      },
      signTypedData: async (params: SignTypedDataParams) => {
        const types: Record<string, Array<TypedDataField>> = {
          [params.primaryType]: params.types["x"].map(
            (value) =>
              ({
                name: value.name,
                type: value.type,
              } as TypedDataField)
          ),
        };

        return (await pkpWallet._signTypedData(
          params.domain ? params.domain : {},
          types,
          params.message
        )) as Address;
      },
    };

    let provider = new AlchemyProvider({
      chain: chain.viemChain,
      entryPointAddress: chain.entryPointAddress,
      apiKey: chain.alchemyAPIKey,
      rpcUrl: undefined,
    }).connect(
      (rpcClient) =>
        new SimpleSmartContractAccount({
          owner,
          entryPointAddress: chain.entryPointAddress,
          chain: chain.viemChain,
          factoryAddress: chain.factoryAddress,
          rpcClient,
        })
    );

    provider = provider.withAlchemyGasManager({
      provider: provider.rpcClient,
      policyId: chain.alchemyGasPolicyId,
      entryPoint: chain.entryPointAddress,
    });

    const address = await provider.getAddress();

    const result: SendUserOperationResult = await provider.sendUserOperation({
      target: IGLOONFT_TOKEN_GORLI_CONTRACT_ADDRESS, // to do based on chain
      data: encodeFunctionData({
        abi: IglooNFTABI.abi,
        functionName: "safeMint",
        args: [address],
      }),
    });

    return result;
  }

  public getEthAddress(): string {
    if (this.pkpEthAddress !== undefined) {
      return this.pkpEthAddress;
    } else {
      throw new Error("pkpEthAddress is undefined");
    }
  }
}
