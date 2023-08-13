import {
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_MAINNET_API_KEY,
  ALCHEMY_SEPOLIA_API_KEY,
  ALCHEMY_GOERLI_GAS_POLICY_ID,
  ALCHEMY_MAINNET_GAS_POLICY_ID,
  ALCHEMY_SEPOLIA_GAS_POLICY_ID,
} from "@/helpers/env";
import { Address } from "viem";
import { mainnet, sepolia, goerli, Chain as ViemChain } from "viem/chains";

export interface Chain {
  chainId: number;
  name: string;
  symbol: string;
  decimals: number;
  type: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  vmType: string;
  testNetwork: boolean;
  factoryAddress: Address;
  entryPointAddress: Address;
}

export const CHAINS = {
  ethereum: {
    chainId: 1,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    type: "ERC1155",
    rpcUrls: ["https://eth-mainnet.alchemyapi.io/v2/"],
    blockExplorerUrls: ["https://etherscan.io"],
    vmType: "EVM",
    testNetwork: false,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as Address,
  },
  goerli: {
    chainId: 5,
    name: "Goerli",
    symbol: "ETH",
    decimals: 18,
    rpcUrls: ["https://eth-goerli.g.alchemy.com/v2/"],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
    type: "ERC1155",
    vmType: "EVM",
    testNetwork: true,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as Address,
  },
  sepolia: {
    chainId: 11155111,
    name: "Sepolia",
    symbol: "ETH",
    decimals: 18,
    rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/"],
    blockExplorerUrls: ["https://sepolia.etherscan.io"],
    type: "ERC1155",
    vmType: "EVM",
    testNetwork: true,
    factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
    entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789" as Address,
  },
};

export function alchemyAPIKey(chain: Chain) {
  switch (chain) {
    case CHAINS.ethereum:
      return ALCHEMY_MAINNET_API_KEY;
    case CHAINS.goerli:
      return ALCHEMY_GOERLI_API_KEY;
    case CHAINS.sepolia:
      return ALCHEMY_SEPOLIA_API_KEY;
    default:
      throw new Error("Unknown chain");
  }
}

export function alchemyGasPolicyId(chain: Chain) {
  switch (chain) {
    case CHAINS.ethereum:
      return ALCHEMY_MAINNET_GAS_POLICY_ID;
    case CHAINS.goerli:
      return ALCHEMY_GOERLI_GAS_POLICY_ID;
    case CHAINS.sepolia:
      return ALCHEMY_SEPOLIA_GAS_POLICY_ID;
    default:
      throw new Error("Unknown chain");
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
      throw new Error("Unknown chain");
  }
}

export const DEFAULT_CHAIN = CHAINS.goerli;

// export const CHAINS: Chain[] = [
//   {
//     chainId: 5001,
//     name: "Mantle Testnet",
//     symbol: "MNT",
//     decimals: 18,
//     type: "ERC1155",
//     rpcUrls: [
//       "https://rpc.ankr.com/mantle_testnet/1a2aec0bfde1e926c21f0f91e0c90d35ec85093c8bbb9435137067b0f6e36056",
//     ],
//     blockExplorerUrls: ["https://explorer.testnet.mantle.xyz/"],
//     vmType: "EVM",
//     testNetwork: true,
//     viemChain: undefined,
//     alchemyAPIKey: ALCHEMY_SEPOLIA_API_KEY,
//     alchemyGasPolicyId: ALCHEMY_SEPOLIA_GAS_POLICY_ID,
//     factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//     entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//   },
//   {
//     chainId: 5000,
//     name: "Mantle",
//     symbol: "MNT",
//     decimals: 18,
//     type: "ERC1155",
//     rpcUrls: ["https://explorer.mantle.xyz/api/eth-rpc"],
//     blockExplorerUrls: ["https://explorer.mantle.xyz/"],
//     vmType: "EVM",
//     testNetwork: false,
//     viemChain: undefined,
//     alchemyAPIKey: ALCHEMY_SEPOLIA_API_KEY,
//     alchemyGasPolicyId: ALCHEMY_SEPOLIA_GAS_POLICY_ID,
//     factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//     entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//   },
//   {
//     chainId: 1,
//     name: "Ethereum",
//     symbol: "ETH",
//     decimals: 18,
//     type: "ERC1155",
//     rpcUrls: ["https://eth-mainnet.alchemyapi.io/v2/"],
//     blockExplorerUrls: ["https://etherscan.io"],
//     vmType: "EVM",
//     testNetwork: false,
//     viemChain: mainnet,
//     alchemyAPIKey: ALCHEMY_MAINNET_API_KEY,
//     alchemyGasPolicyId: ALCHEMY_MAINNET_GAS_POLICY_ID,
//     factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//     entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//   },
//   {
//     chainId: 137,
//     name: "Polygon",
//     symbol: "MATIC",
//     decimals: 18,
//     rpcUrls: ["https://polygon-rpc.com"],
//     blockExplorerUrls: ["https://explorer.matic.network"],
//     type: "ERC1155",
//     vmType: "EVM",
//     testNetwork: false,
//     viemChain: polygon,
//     alchemyAPIKey: ALCHEMY_SEPOLIA_API_KEY,
//     alchemyGasPolicyId: ALCHEMY_SEPOLIA_GAS_POLICY_ID,
//     factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//     entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//   },
//   {
//     chainId: 42161,
//     name: "Arbitrum",
//     symbol: "AETH",
//     decimals: 18,
//     type: "ERC1155",
//     rpcUrls: ["https://arb1.arbitrum.io/rpc"],
//     blockExplorerUrls: ["https://arbiscan.io/"],
//     vmType: "EVM",
//     testNetwork: false,
//     viemChain: arbitrum,
//     alchemyAPIKey: ALCHEMY_SEPOLIA_API_KEY,
//     alchemyGasPolicyId: ALCHEMY_SEPOLIA_GAS_POLICY_ID,
//     factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//     entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//   },
//   {
//     chainId: 80001,
//     name: "Mumbai",
//     symbol: "MATIC",
//     decimals: 18,
//     rpcUrls: ["https://rpc-mumbai.maticvigil.com/v1/"],
//     blockExplorerUrls: ["https://mumbai.polygonscan.com"],
//     type: "ERC1155",
//     vmType: "EVM",
//     testNetwork: true,
//     viemChain: polygonMumbai,
//     alchemyAPIKey: "96bf5fa6e03d272fbd09de48d03927b95633726c",
//     alchemyGasPolicyId: ALCHEMY_SEPOLIA_GAS_POLICY_ID,
//     factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//     entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//   },
//   {
//     chainId: 5,
//     name: "Goerli",
//     symbol: "ETH",
//     decimals: 18,
//     rpcUrls: ["https://eth-goerli.g.alchemy.com/v2/"],
//     blockExplorerUrls: ["https://goerli.etherscan.io"],
//     type: "ERC1155",
//     vmType: "EVM",
//     testNetwork: true,
//     viemChain: goerli,
//     alchemyAPIKey: ALCHEMY_GOERLI_API_KEY,
//     alchemyGasPolicyId: ALCHEMY_GOERLI_GAS_POLICY_ID,
//     factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//     entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//   },
//   {
//     chainId: 11155111,
//     name: "Sepolia",
//     symbol: "ETH",
//     decimals: 18,
//     rpcUrls: ["https://eth-sepolia.g.alchemy.com/v2/"],
//     blockExplorerUrls: ["https://sepolia.etherscan.io"],
//     type: "ERC1155",
//     vmType: "EVM",
//     testNetwork: true,
//     viemChain: sepolia,
//     alchemyAPIKey: ALCHEMY_SEPOLIA_API_KEY,
//     alchemyGasPolicyId: ALCHEMY_SEPOLIA_GAS_POLICY_ID,
//     factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//     entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//   },
//   {
//     chainId: 10,
//     name: "Optimism",
//     symbol: "ETH",
//     decimals: 18,
//     rpcUrls: ["https://mainnet.optimism.io"],
//     blockExplorerUrls: ["https://optimistic.etherscan.io"],
//     type: "ERC1155",
//     vmType: "EVM",
//     testNetwork: false,
//     viemChain: optimism,
//     alchemyAPIKey: ALCHEMY_SEPOLIA_API_KEY,
//     alchemyGasPolicyId: ALCHEMY_SEPOLIA_GAS_POLICY_ID,
//     factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//     entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//   },
//   {
//     chainId: 42220,
//     name: "Celo",
//     symbol: "CELO",
//     decimals: 18,
//     rpcUrls: ["https://forno.celo.org"],
//     blockExplorerUrls: ["https://explorer.celo.org"],
//     type: "ERC1155",
//     vmType: "EVM",
//     testNetwork: false,
//     viemChain: celo,
//     alchemyAPIKey: ALCHEMY_SEPOLIA_API_KEY,
//     alchemyGasPolicyId: ALCHEMY_SEPOLIA_GAS_POLICY_ID,
//     factoryAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//     entryPointAddress: "0x3c752E964f94A6e45c9547e86C70D3d9b86D3b17" as Address,
//   },
// ];
