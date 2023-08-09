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
import { PKPEthersWallet, ethRequestHandler } from "@lit-protocol/pkp-ethers";
import { BigNumber, ethers } from "ethers";
import {
  FunWallet,
  Auth,
  GlobalEnvOption,
  configureEnvironment,
} from "@fun-xyz/core";
import { goerli } from "viem/chains";
import { encodeFunctionData, toHex } from "viem";
import { IglooNFTABI } from "./IglooNFTABI";
import { TypedDataField } from "@ethersproject/abstract-signer";

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
        relayApiKey: "LIT_API_KEY",
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
        authMethods: [authData],
        pkpPublicKey,
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
          ability: LitAbility.LitActionExecution,
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
    const config: GlobalEnvOption = {
      chain: "5",
      gasSponsor: {
        sponsorAddress: "0x175C5611402815Eba550Dad16abd2ac366a63329",
      },
      apiKey: "fdCYRuB0QxXIzAsdSQVm5dryxfs0KAra0xZyqUX3",
    };
    await configureEnvironment(config);
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

    const auth = new Auth({ signer: pkpWallet });
    const authId = await auth.getUserId();
    const funWallet = new FunWallet({
      users: [{ userId: await auth.getUserId() }],
      uniqueId: await auth.getWalletUniqueId("5"),
    });
    const address = await funWallet.getAddress();

    const data = encodeFunctionData({
      abi: IglooNFTABI.abi,
      functionName: "safeMint",
      args: [address],
    });
    const op = await funWallet.createOperation(auth, authId, {
      to: IGLOONFT_TOKEN_GORLI_CONTRACT_ADDRESS,
      data: data,
    });
    const receipt = await funWallet.executeOperation(auth, op);

    console.log("hash: ", receipt.txId);
    return receipt.txId ?? "";
  }

  public getEthAddress(): string {
    if (this.pkpEthAddress !== undefined) {
      return this.pkpEthAddress;
    } else {
      throw new Error("pkpEthAddress is undefined");
    }
  }
}
