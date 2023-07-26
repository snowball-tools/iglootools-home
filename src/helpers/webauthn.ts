import { LitAuthClient, WebAuthnProvider } from "@lit-protocol/lit-auth-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ProviderType } from "@lit-protocol/constants";
import { AuthMethod, AuthCallbackParams } from "@lit-protocol/types";
import {
  LitAbility,
  LitAccessControlConditionResource,
} from "@lit-protocol/auth-helpers";
import { startAuthentication } from "@simplewebauthn/browser";
import { ethers } from "ethers";
import base64url from "base64url";
import { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";

const relayServerUrl = "https://relay-server-staging.herokuapp.com";
const rpId = "iglootools.xyz";
const rpcUrl = "https://chain-rpc.litprotocol.com/http";

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
        // to do:
        resource: new LitAccessControlConditionResource("litAction://*"),
        ability: LitAbility.PKPSigning,
      },
    ],
    switchChain: false,
    authNeededCallback: authNeededCallback,
  });

  return sessionSigs;
}
