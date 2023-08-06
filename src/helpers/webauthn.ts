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
import { BigNumber } from "ethers";

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
        relayApiKey: "{{ LIT_RELAY_API_KEY }}",
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

  public async register(
    username: string
  ): Promise<IRelayPollStatusResponse | null> {
    try {
      const options = await this.webAuthnProvider.register(username);

      const txHash = await this.webAuthnProvider.verifyAndMintPKPThroughRelayer(
        options
      );

      const response =
        await this.webAuthnProvider.relay.pollRequestUntilTerminalState(txHash);

      this.pkpPublicKey = response.pkpPublicKey;
      this.pkpEthAddress = response.pkpEthAddress;
      return response;
    } catch (error) {
      console.error("An error occurred while registering:", error);
      return null;
    }
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
    authData: AuthMethod
  ): Promise<SessionSigsMap> {
    await this.litNodeClient.connect();

    const authNeededCallback = async (params: AuthCallbackParams) => {
      const resp = await this.litNodeClient.signSessionKey({
        authMethods: [authData],
        pkpPublicKey,
        expiration: params.expiration,
        resources: params.resources,
        chainId: 1,
      });
      return resp.authSig;
    };

    const sessionSigs = await this.litNodeClient.getSessionSigs({
      expiration: DEFAULT_EXP,
      chain: "ethereum",
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LitAbility.LitActionExecution,
        },
      ],
      switchChain: false,
      authNeededCallback: authNeededCallback,
    });

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

  public async sendTransaction(toEthAddress: string): Promise<string> {
    // to do: handle clientside
    if (this.pkpPublicKey == undefined || this.pkpEthAddress == undefined) {
      throw new Error(
        "authenticatedResponse is undefined or has no eth address"
      );
    }

    const pkpWallet = (await this.createPkpEthersWallet(
      this.pkpPublicKey
    )) as PKPEthersWallet;

    const from = this.pkpEthAddress;
    const to = toEthAddress;
    const gasLimit = BigNumber.from("21000");
    const value = BigNumber.from("10");
    const data = "0x";

    const transactionRequest = {
      from,
      to,
      gasLimit,
      value,
      data,
    };

    const signedTransactionRequest = await pkpWallet.signTransaction(
      transactionRequest
    );

    const result = await ethRequestHandler({
      signer: pkpWallet,
      payload: {
        method: "eth_sendTransaction",
        params: [signedTransactionRequest],
      },
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
