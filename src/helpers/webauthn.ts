import { LitAuthClient, WebAuthnProvider } from "@lit-protocol/lit-auth-client";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { ProviderType } from "@lit-protocol/constants";
import {
  AuthMethod,
  AuthCallbackParams,
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
import { IglooNFTABI } from "./abis/IglooNFTABI";
import { TypedDataField } from "@ethersproject/abstract-signer";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LIT_RELAY_API_KEY } from "../helpers/env";
import {
  Chain,
  alchemyAPIKey,
  alchemyGasPolicyId,
  getAlchemyNetwork,
  viemChain,
} from "./chains";
import { Alchemy, OwnedNft } from "alchemy-sdk";

export const DEFAULT_EXP = new Date(
  Date.now() + 1000 * 60 * 60 * 24 * 7
).toISOString();

const litAuthClient = new LitAuthClient({
  litRelayConfig: {
    relayApiKey: LIT_RELAY_API_KEY,
  },
});
litAuthClient.initProvider(ProviderType.WebAuthn);

const webAuthnProvider = litAuthClient.getProvider(
  ProviderType.WebAuthn
) as WebAuthnProvider;

const litNodeClient = new LitNodeClient({
  litNetwork: "serrano",
  debug: false,
});

export async function registerPasskey(username: string): Promise<{
  pkpEthAddress: string;
  pkpPublicKey: string;
}> {
  try {
    const options = await webAuthnProvider.register(username);
    const txHash = await webAuthnProvider.verifyAndMintPKPThroughRelayer(
      options
    );
    const response = await webAuthnProvider.relay.pollRequestUntilTerminalState(
      txHash
    );

    if (
      response.pkpEthAddress === undefined ||
      response.pkpPublicKey === undefined
    ) {
      return Promise.reject("Registration failed");
    }
    return {
      pkpEthAddress: response.pkpEthAddress,
      pkpPublicKey: response.pkpPublicKey,
    };
  } catch (error) {
    console.error("Registration failed:", error);
    return Promise.reject("Registration failed");
  }
}

export async function authenticatePasskey(): Promise<AuthMethod> {
  try {
    const auth = await webAuthnProvider.authenticate();

    if (auth === undefined) {
      return Promise.reject("Authentication failed");
    }

    return auth;
  } catch (error) {
    console.error("Authentication failed:", error);
    return Promise.reject("Authentication failed");
  }
}

export async function fetchPkpsForAuthMethod(
  authMethod: AuthMethod
): Promise<IRelayPKP[]> {
  try {
    const pkps = await webAuthnProvider.fetchPKPsThroughRelayer(authMethod);
    if (pkps.length === 0) {
      return Promise.reject("No PKPs found");
    }
    return pkps;
  } catch (error) {
    console.error("Retrieving PKPs failed:", error);
    return Promise.reject("Retrieving PKPs failed");
  }
}

export async function getSessionSigs(
  pkpPublicKey: string,
  pkpEthAddress: string,
  authData: AuthMethod,
  chain: Chain
): Promise<SessionSigsMap> {
  try {
    await litNodeClient.connect();

    const authNeededCallback = async (params: AuthCallbackParams) => {
      const resp = await litNodeClient.signSessionKey({
        statement: params.statement,
        authMethods: [authData],
        pkpPublicKey: pkpPublicKey,
        expiration: params.expiration,
        resources: params.resources,
        chainId: chain.chainId,
      });
      return resp.authSig;
    };

    const sessionSigs = await litNodeClient.getSessionSigs({
      expiration: DEFAULT_EXP,
      chain: chain.name,
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LitAbility.PKPSigning,
        },
      ],
      switchChain: false,
      authNeededCallback: authNeededCallback,
    });

    if (sessionSigs === undefined) {
      return Promise.reject("Retrieving session sigs failed. undefined");
    }

    return sessionSigs;
  } catch (error) {
    console.error("Retrieving session sigs failed:", error);
    return Promise.reject("Retrieving session sigs failed");
  }
}

export async function createPkpEthersWallet(
  pkpPublicKey: string,
  pkpEthAddress: string,
  sessionSig: SessionSigsMap,
  chain: Chain
): Promise<PKPEthersWallet> {
  try {
    const pkpWallet = new PKPEthersWallet({
      controllerSessionSigs: sessionSig,
      pkpPubKey: pkpPublicKey,
      rpc: "https://chain-rpc.litprotocol.com/http",
    });
    await pkpWallet.init();

    if (pkpWallet === undefined) {
      return Promise.reject("Transaction failed");
    }

    return pkpWallet;
  } catch (error) {
    console.error("Transaction failed:", error);
    return Promise.reject("Transaction failed");
  }
}

export async function getSimpleAccountOwner(
  pkpWallet: PKPEthersWallet
): Promise<SimpleSmartAccountOwner> {
  console.log("Getting Simple Account Owner");
  try {
    const owner: SimpleSmartAccountOwner = {
      signMessage: async (msg: Uint8Array) => {
        return (await pkpWallet.signMessage(msg)) as Address;
      },
      getAddress: async () => {
        return (await pkpWallet.getAddress()) as Address;
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

    return owner;
  } catch (error) {
    console.error("Get Simple Account Owner failed:", error);
    return Promise.reject("Get Simple Account Owner failed");
  }
}

export async function getSmartWalletAddress(
  pkpEthWallet: PKPEthersWallet,
  chain: Chain
): Promise<Address> {
  console.log("Getting Smart Wallet Address");

  try {
    const owner: SimpleSmartAccountOwner = await getSimpleAccountOwner(
      pkpEthWallet
    );

    const provider = new AlchemyProvider({
      chain: viemChain(chain),
      entryPointAddress: chain.entryPointAddress,
      apiKey: alchemyAPIKey(chain),
      rpcUrl: undefined,
    }).connect(
      (rpcClient) =>
        new SimpleSmartContractAccount({
          owner,
          entryPointAddress: chain.entryPointAddress,
          chain: viemChain(chain),
          factoryAddress: chain.factoryAddress,
          rpcClient,
        })
    );

    const address = await provider.getAddress();

    return address;
  } catch (error) {
    console.error("Getting Counterfactual Address failed:", error);
    return Promise.reject("Getting Counterfactual Address failed");
  }
}

export async function sendUserOperation(
  pkpEthAddress: string,
  pkpWallet: PKPEthersWallet,
  chain: Chain
): Promise<{
  hash: string;
  nftId: string | undefined;
}> {
  console.log("Sending user operation");
  console.log("chain", chain);
  try {
    const owner: SimpleSmartAccountOwner = await getSimpleAccountOwner(
      pkpWallet
    );

    let provider = new AlchemyProvider({
      chain: viemChain(chain),
      entryPointAddress: chain.entryPointAddress,
      apiKey: alchemyAPIKey(chain),
      rpcUrl: undefined,
    }).connect(
      (rpcClient) =>
        new SimpleSmartContractAccount({
          owner,
          entryPointAddress: chain.entryPointAddress,
          chain: viemChain(chain),
          factoryAddress: chain.factoryAddress,
          rpcClient,
        })
    );

    provider = provider.withAlchemyGasManager({
      policyId: alchemyGasPolicyId(chain),
      entryPoint: chain.entryPointAddress,
    });

    const address = await provider.getAddress();

    const result: SendUserOperationResult = await provider.sendUserOperation({
      target: chain.iglooNFTAddress,
      data: encodeFunctionData({
        abi: IglooNFTABI.abi,
        functionName: "safeMint",
        args: [address],
      }),
    });

    if (result === undefined || result.hash === undefined) {
      return Promise.reject("Transaction failed");
    }

    const settings = {
      apiKey: alchemyAPIKey(chain),
      network: getAlchemyNetwork(chain),
    };

    const alchemy = new Alchemy(settings);

    // theres a way better way hack for now
    // fix this
    let nfts = await alchemy.nft.getNftsForOwner(address);
    let attempt = 0;

    while (nfts.ownedNfts.length === 0 && attempt < 10) {
      nfts = await alchemy.nft.getNftsForOwner(address);
      attempt++;
    }

    if (nfts === undefined || nfts.ownedNfts.length === 0) {
      return Promise.reject(
        `NFT may have failed -- check hash: ${result.hash}`
      );
    }

    const id = nfts.ownedNfts.reduce((prev: OwnedNft, curr: OwnedNft) => {
      return curr.tokenId > prev.tokenId ? curr : prev;
    }).tokenId;

    return {
      hash: result.hash,
      nftId: id,
    };
  } catch (error) {
    console.error("Transaction failed:", error);
    return Promise.reject("Transaction failed");
  }
}
