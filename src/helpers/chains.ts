import { Address } from "viem";
import { mainnet, sepolia, goerli, Chain as ViemChain } from "viem/chains";
import { Network } from "alchemy-sdk";

export interface Chain {
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  type: string;
  enabled: boolean;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  vmType: string;
  testNetwork: boolean;
  factoryAddress: Address;
  entryPointAddress: Address;
  iglooNFTAddress: Address;
}

export const CHAINS = {
  ethereum: {
    chainId: 1,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    type: "ERC1155",
    enabled: false,
    rpcUrls: ["https://eth-mainnet.alchemyapi.io/v2/"],
    blockExplorerUrls: ["https://etherscan.io"],
    vmType: "EVM",
    testNetwork: false,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as Address,
    iglooNFTAddress: "0x799e75059126E6DA27A164d1315b1963Fb82c44F" as Address,
  },
  goerli: {
    chainId: 5,
    name: "Goerli",
    symbol: "ETH",
    decimals: 18,
    rpcUrls: ["https://eth-goerli.g.alchemy.com/v2/"],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
    type: "ERC1155",
    enabled: true,
    vmType: "EVM",
    testNetwork: true,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as Address,
    iglooNFTAddress: "0x799e75059126E6DA27A164d1315b1963Fb82c44F" as Address,
  },
  sepolia: {
    chainId: 11155111,
    name: "Sepolia",
    symbol: "ETH",
    decimals: 18,
    rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
    type: "ERC1155",
    enabled: true,
    vmType: "EVM",
    testNetwork: true,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as Address,
    iglooNFTAddress: "0x98AdA10fC1EAf5d21DB0f91d09fAa6165e427106" as Address,
  },
  mantle: {
    chainId: 5000,
    name: "Mantle",
    symbol: "MNT",
    decimals: 18,
    type: "ERC1155",
    enabled: false,
    rpcUrls: ["https://explorer.mantle.xyz/api/eth-rpc"],
    blockExplorerUrls: ["https://explorer.mantle.xyz/"],
    vmType: "EVM",
    testNetwork: false,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    iglooNFTAddress: "0x98AdA10fC1EAf5d21DB0f91d09fAa6165e427106" as Address,
  },
  mantle_testnet: {
    chainId: 5001,
    name: "Ringwood",
    symbol: "MNT",
    decimals: 18,
    type: "ERC1155",
    enabled: false,
    rpcUrls: [
      "https://rpc.ankr.com/mantle_testnet/1a2aec0bfde1e926c21f0f91e0c90d35ec85093c8bbb9435137067b0f6e36056",
    ],
    blockExplorerUrls: ["https://explorer.testnet.mantle.xyz/"],
    vmType: "EVM",
    testNetwork: true,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    iglooNFTAddress: "0x98AdA10fC1EAf5d21DB0f91d09fAa6165e427106" as Address,
  },
  polygon: {
    chainId: 137,
    name: "Polygon",
    symbol: "MATIC",
    decimals: 18,
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://explorer.matic.network"],
    type: "ERC1155",
    enabled: false,
    vmType: "EVM",
    testNetwork: false,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    iglooNFTAddress: "0x98AdA10fC1EAf5d21DB0f91d09fAa6165e427106" as Address,
  },
  mumbai: {
    chainId: 80001,
    name: "Mumbai",
    symbol: "MATIC",
    decimals: 18,
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/v1/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    type: "ERC1155",
    enabled: false,
    vmType: "EVM",
    testNetwork: true,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    iglooNFTAddress: "0x98AdA10fC1EAf5d21DB0f91d09fAa6165e427106" as Address,
  },
  arbitrum: {
    chainId: 42161,
    name: "Arbitrum",
    symbol: "AETH",
    decimals: 18,
    type: "ERC1155",
    enabled: false,
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io/"],
    vmType: "EVM",
    testNetwork: false,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    iglooNFTAddress: "0x98AdA10fC1EAf5d21DB0f91d09fAa6165e427106" as Address,
  },
  optimism: {
    chainId: 10,
    name: "Optimism",
    symbol: "ETH",
    decimals: 18,
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
    type: "ERC1155",
    enabled: false,
    vmType: "EVM",
    testNetwork: false,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    iglooNFTAddress: "0x98AdA10fC1EAf5d21DB0f91d09fAa6165e427106" as Address,
  },
  celo: {
    chainId: 42220,
    name: "Celo",
    symbol: "CELO",
    decimals: 18,
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://explorer.celo.org"],
    type: "ERC1155",
    enabled: false,
    vmType: "EVM",
    testNetwork: false,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    iglooNFTAddress: "0x98AdA10fC1EAf5d21DB0f91d09fAa6165e427106" as Address,
  },
} as { [key: string]: Chain };

export const DEFAULT_CHAIN = CHAINS.goerli;

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
