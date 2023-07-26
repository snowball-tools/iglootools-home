import { LitAuthClient, WebAuthnProvider } from "@lit-protocol/lit-auth-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ProviderType } from "@lit-protocol/constants";
import { AuthMethod, AuthCallbackParams } from "@lit-protocol/types";
import { LitAbility, LitActionResource } from "@lit-protocol/auth-helpers";
import { PKPEthersWallet, ethRequestHandler } from "@lit-protocol/pkp-ethers";
import { BigNumber } from "ethers";

// to do: "static" func -> ts object

export const DEFAULT_EXP = new Date(
  Date.now() + 1000 * 60 * 60 * 24 * 7
).toISOString();

const litAuthClient = new LitAuthClient({
  litRelayConfig: {
    relayApiKey: "{{ LIT_RELAY_API_KEY }}",
  },
});

litAuthClient.initProvider(ProviderType.WebAuthn);

export async function registerWithWebAuthn(username: string) {
  const provider = litAuthClient.getProvider(
    ProviderType.WebAuthn
  ) as WebAuthnProvider;

  const options = await provider.register(username);

  const txHash = await provider.verifyAndMintPKPThroughRelayer(options);
  const response = await provider.relay.pollRequestUntilTerminalState(txHash);

  return response;
}

export async function authenticateWithWebAuthn() {
  const provider = litAuthClient.getProvider(
    ProviderType.WebAuthn
  ) as WebAuthnProvider;

  const authMethod = await provider.authenticate();
  return authMethod as AuthMethod;
}

export async function fetchPkps(authMethod: AuthMethod) {
  const provider = litAuthClient.getProvider(
    ProviderType.WebAuthn
  ) as WebAuthnProvider;

  const pkp = provider.fetchPKPsThroughRelayer(authMethod);
  return pkp;
}

export async function getSessionSigsForWebAuthn(
  pkpPublicKey: string,
  authData: AuthMethod
) {
  const litNodeClient = new LitNodeClient({
    litNetwork: "serrano",
    debug: false,
  });
  await litNodeClient.connect();

  const authNeededCallback = async (params: AuthCallbackParams) => {
    const resp = await litNodeClient.signSessionKey({
      authMethods: [authData],
      pkpPublicKey,
      expiration: params.expiration,
      resources: params.resources,
      chainId: 1,
    });
    return resp.authSig;
  };

  const sessionSigs = await litNodeClient.getSessionSigs({
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

// to do
export async function createPkpEthersWallet(
  pkpPublicKey: string,
  authData: AuthMethod
) {
  const litNodeClient = new LitNodeClient({
    litNetwork: "serrano",
    debug: false,
  });
  await litNodeClient.connect();

  const signSessionKeyResponse = await litNodeClient.signSessionKey({
    authMethods: [authData],
    pkpPublicKey,
    expiration: DEFAULT_EXP,
    resources: [
      {
        resource: new LitActionResource("*"),
        ability: LitAbility.LitActionExecution,
      },
    ],
    chainId: 1,
  });

  const pkpWallet = new PKPEthersWallet({
    controllerAuthSig: signSessionKeyResponse.authSig,
    // Or you can also pass in controllerSessionSigs
    pkpPubKey: pkpPublicKey,
    rpc: "https://chain-rpc.litprotocol.com/http",
  });
  await pkpWallet.init();

  return pkpWallet;
}

// to do
export async function sendTransaction(
  pkpPublicKey: string,
  authData: AuthMethod,
  ethAddress: string,
  toEthAddress: string
) {
  const pkpWallet = (await createPkpEthersWallet(
    pkpPublicKey,
    authData
  )) as PKPEthersWallet;

  const from = ethAddress;
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
