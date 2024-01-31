import { Address } from "viem";
import { mainnet, sepolia, goerli, Chain as ViemChain } from "viem/chains";
import { Network } from "alchemy-sdk";
import { CHAINS, Chain } from "@snowballtools/snowball-ts-sdk";

export const DEFAULT_CHAIN = CHAINS.goerli;

export function getIglooNFTAddress(chain: Chain): Address {
  switch (chain) {
    case CHAINS.goerli:
      return "0x799e75059126E6DA27A164d1315b1963Fb82c44F" as Address;
    case CHAINS.sepolia:
      return "0x98AdA10fC1EAf5d21DB0f91d09fAa6165e427106" as Address;
    default:
      throw new Error("Unsupported chain");
  }
}

export function alchemyAPIKey(chain: Chain): string {
  switch (chain) {
    case CHAINS.ethereum:
      return process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_API_KEY as string;
    case CHAINS.goerli:
      return process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY as string;
    case CHAINS.sepolia:
      return process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY as string;
    default:
      throw new Error("Unsupported chain");
  }
}

export function alchemyGasPolicyId(chain: Chain): string {
  switch (chain) {
    case CHAINS.ethereum:
      return process.env.NEXT_PUBLIC_ALCHEMY_MAINNET_GAS_POLICY_ID as string;
    case CHAINS.goerli:
      return process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_GAS_POLICY_ID as string;
    case CHAINS.sepolia:
      return process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_GAS_POLICY_ID as string;
    default:
      throw new Error("Unsupported chain");
  }
}

export function viemChain(chain: Chain): ViemChain {
  switch (chain) {
    case CHAINS.ethereum:
      return mainnet;
    case CHAINS.goerli:
      return goerli;
    case CHAINS.sepolia:
      return sepolia;
    default:
      throw new Error("Unsupported chain");
  }
}

export function getChainIcon(chain: Chain): string {
  switch (chain) {
    case CHAINS.polygon:
    case CHAINS.mumbai:
      return "polygon.svg";
    case CHAINS.mantle:
    case CHAINS.mantle_testnet:
      return "mantle_black.svg";
    case CHAINS.arbitrum:
      return "arbitrum.svg";
    case CHAINS.optimism:
      return "optimism.svg";
    case CHAINS.celo:
      return "celo.svg";
    default:
      return "ethereum.svg";
  }
}

export function getChainWebhookID(chain: Chain): string {
  switch (chain) {
    case CHAINS.goerli:
      return process.env.NEXT_PUBLIC_ALCHEMY_GOERLI_WEBHOOK_ID as string;
    case CHAINS.sepolia:
      return process.env.NEXT_PUBLIC_ALCHEMY_SEPOLIA_WEBHOOK_ID as string;
    default:
      return "";
  }
}

export function getChainWebhookSigningKey(chain: string): string {
  switch (chain) {
    case "ETH_SEPOLIA":
      return process.env
        .NEXT_PUBLIC_ALCHEMY_SEPOLIA_WEBHOOK_SIGNING_KEY as string;
    case "ETH_GOERLI":
      return process.env
        .NEXT_PUBLIC_ALCHEMY_GOERLI_WEBHOOK_SIGNING_KEY as string;
    default:
      return "";
  }
}

export function getAlchemyNetwork(chain: Chain): Network {
  switch (chain) {
    case CHAINS.ethereum:
      return Network.ETH_MAINNET;
    case CHAINS.goerli:
      return Network.ETH_GOERLI;
    case CHAINS.sepolia:
      return Network.ETH_SEPOLIA;
    default:
      throw new Error("Unsupported chain");
  }
}
