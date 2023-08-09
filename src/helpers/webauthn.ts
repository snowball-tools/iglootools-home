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
import { BigNumber } from "ethers";
import {
  SimpleSmartContractAccount,
  SmartAccountProvider,
  SimpleSmartAccountOwner,
  Address,
  SignTypedDataParams,
} from "@alchemy/aa-core";
import { goerli } from "viem/chains";
import { encodeFunctionData } from "viem";
import { IglooNFTABI } from "./IglooNFTABI";
import { TypedDataField } from "@ethersproject/abstract-signer";

const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17";
const ENTRY_POINT_ADDRESS = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";
const IGLOONFT_TOKEN_GORLI_CONTRACT_ADDRESS =
  "0x799e75059126E6DA27A164d1315b1963Fb82c44F";

export const DEFAULT_EXP = new Date(
  Date.now() + 1000 * 60 * 60 * 24 * 7
).toISOString();

export class Passkey {
  private litAuthClient: LitAuthClient;
  private webAuthnProvider: WebAuthnProvider;
  private litNodeClient: LitNodeClient;

  public pkpPublicKey: string | undefined;
  public pkpEthAddress: string | undefined;
  public sessionSig: SessionSigsMap | undefined;

  constructor() {
    this.litAuthClient = new LitAuthClient({
      litRelayConfig: {
        relayApiKey: process.env.LIT_RELAY_API_KEY,
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
    chain: string
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
        chainId: 5,
      });
      return resp.authSig;
    };

    const sessionSigs = await this.litNodeClient.getSessionSigs({
      expiration: DEFAULT_EXP,
      chain: chain,
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LitAbility.PKPSigning,
        },
      ],
      switchChain: false,
      authNeededCallback: authNeededCallback,
    });

    this.sessionSig = sessionSigs;

    return sessionSigs;
  }

  public async createPkpEthersWallet(
    pkpPublicKey: string
  ): Promise<PKPEthersWallet> {
    if (this.sessionSig === undefined) {
      throw new Error("sessionSig is undefined");
    }

    const pkpWallet = new PKPEthersWallet({
      controllerSessionSigs: this.sessionSig,
      pkpPubKey: pkpPublicKey,
      rpc: "https://chain-rpc.litprotocol.com/http",
    });
    await pkpWallet.init();

    return pkpWallet;
  }

  public async sendUserOperation(): Promise<string> {
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

    const provider = new SmartAccountProvider(
      "https://eth-goerli.g.alchemy.com/v2/" +
        process.env.ALCHEMY_GOERLI_API_KEY,
      ENTRY_POINT_ADDRESS,
      goerli
    ).connect(
      (rpcClient) =>
        new SimpleSmartContractAccount({
          owner,
          entryPointAddress: ENTRY_POINT_ADDRESS,
          chain: goerli,
          factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
          rpcClient,
        })
    );

    const address = await provider.getAddress();

    const { hash } = await provider.sendUserOperation({
      target: IGLOONFT_TOKEN_GORLI_CONTRACT_ADDRESS,
      data: encodeFunctionData({
        abi: IglooNFTABI.abi,
        functionName: "safeMint",
        args: [address],
      }),
    });

    console.log("hash: ", hash);
    return hash;
  }

  public getEthAddress(): string {
    if (this.pkpEthAddress !== undefined) {
      return this.pkpEthAddress;
    } else {
      throw new Error("pkpEthAddress is undefined");
    }
  }
}
