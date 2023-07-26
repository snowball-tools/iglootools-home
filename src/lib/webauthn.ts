import { LitAuthClient, WebAuthnProvider } from "@lit-protocol/lit-auth-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ProviderType } from "@lit-protocol/constants";
import {
  AuthMethod,
  WebAuthnAuthenticationVerificationParams,
  AuthCallbackParams,
} from "@lit-protocol/types";
import {
  LitAbility,
  LitAccessControlConditionResource,
} from "@lit-protocol/auth-helpers";
import { startAuthentication } from "@simplewebauthn/browser";
import { ethers } from "ethers";
import base64url from "base64url";
import {
  PublicKeyCredentialRequestOptionsJSON,
  AuthenticationResponseJSON,
} from "@simplewebauthn/typescript-types";

const relayServerUrl = "https://relay-server-staging.herokuapp.com";
const rpId = "iglootools.xyz";
const rpcUrl = "https://chain-rpc.litprotocol.com/http";

export const DEFAULT_EXP = new Date(
  Date.now() + 1000 * 60 * 60 * 24 * 7,
).toISOString();

const litAuthClient = new LitAuthClient({
  litRelayConfig: {
    relayApiKey: "{{ LIT_RELAY_API_KEY }}",
  },
});

litAuthClient.initProvider(ProviderType.WebAuthn);

const provider = litAuthClient.getProvider(
  ProviderType.WebAuthn,
) as WebAuthnProvider;

export async function registerWithWebAuthn(username: string) {
  const options = await provider.register(username);

  const txHash = await provider.verifyAndMintPKPThroughRelayer(options);
  const response = await provider.relay.pollRequestUntilTerminalState(txHash);

  return response.pkpPublicKey;
}

export async function authenticateWithWebAuthn() {
  const authMethod = await provider.authenticate();
  return authMethod as AuthMethod;
}

// todo: write tests
export async function fetchPKPs(authData: AuthMethod) {
  const fetchRes = await fetch(`${relayServerUrl}/auth/webauthn/userinfo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": "{{ LIT_RELAY_API_KEY }}",
    },
    body: JSON.stringify({ credential: authData }),
  });
  if (fetchRes.status < 200 || fetchRes.status >= 400) {
    const errorJson = await fetchRes.json();
    const errorMsg = errorJson.error || "Unknown error";
    const relayErr = new Error(`Unable to fetch PKPs: ${errorMsg}`);
    throw relayErr;
  }
  const fetchJSON = await fetchRes.json();
  return fetchJSON.pkps;
}

export async function authenticate() {
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const block = await provider.getBlock("latest");
  const blockHash = block.hash;

  const blockHashBytes = ethers.utils.arrayify(blockHash);
  const authenticationOptions: PublicKeyCredentialRequestOptionsJSON = {
    challenge: base64url(Buffer.from(blockHashBytes)),
    timeout: 60000,
    userVerification: "preferred",
    rpId,
  };

  const authenticationResponse = (await startAuthentication(
    authenticationOptions,
  )) as WebAuthnAuthenticationVerificationParams;

  const actualAuthenticationResponse: WebAuthnAuthenticationVerificationParams =
    JSON.parse(JSON.stringify(authenticationResponse));

  // todo: pull request to ensure userHandle is base64url encoded / check
  actualAuthenticationResponse.response.userHandle = base64url.encode(
    authenticationResponse.response.userHandle as string,
  );

  return authenticationResponse;
}

export async function getSessionSigsForWebAuthn(
  pkpPublicKey: string,
  authData: WebAuthnAuthenticationVerificationParams,
) {
  const litNodeClient = new LitNodeClient({
    litNetwork: "serrano",
    debug: false,
  });
  await litNodeClient.connect();

  const authMethod = litNodeClient.generateAuthMethodForWebAuthn(authData);

  const authNeededCallback = async (params: AuthCallbackParams) => {
    const resp = await litNodeClient.signSessionKey({
      authMethods: [authMethod],
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
