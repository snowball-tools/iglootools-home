export const STATE_KEY = "igloo-state";

export const DEFAULT_CHAIN_ID = 5;

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
}

export const CHAINS: Chain[] = [
  {
    chainId: 5001,
    name: "Mantle Testnet",
    symbol: "MNT",
    decimals: 18,
    type: "ERC1155",
    rpcUrls: [
      "https://rpc.ankr.com/mantle_testnet/1a2aec0bfde1e926c21f0f91e0c90d35ec85093c8bbb9435137067b0f6e36056",
    ],
    blockExplorerUrls: ["https://explorer.testnet.mantle.xyz/"],
    vmType: "EVM",
    testNetwork: true,
  },
  {
    chainId: 5000,
    name: "Mantle",
    symbol: "MNT",
    decimals: 18,
    type: "ERC1155",
    rpcUrls: ["https://explorer.mantle.xyz/api/eth-rpc"],
    blockExplorerUrls: ["https://explorer.mantle.xyz/"],
    vmType: "EVM",
    testNetwork: false,
  },
  {
    chainId: 1,
    name: "Ethereum",
    symbol: "ETH",
    decimals: 18,
    type: "ERC1155",
    rpcUrls: [
      "https://eth-mainnet.alchemyapi.io/v2/EuGnkVlzVoEkzdg0lpCarhm8YHOxWVxE",
    ],
    blockExplorerUrls: ["https://etherscan.io"],
    vmType: "EVM",
    testNetwork: false,
  },
  {
    chainId: 137,
    name: "Polygon",
    symbol: "MATIC",
    decimals: 18,
    rpcUrls: ["https://polygon-rpc.com"],
    blockExplorerUrls: ["https://explorer.matic.network"],
    type: "ERC1155",
    vmType: "EVM",
    testNetwork: false,
  },
  {
    chainId: 42161,
    name: "Arbitrum",
    symbol: "AETH",
    decimals: 18,
    type: "ERC1155",
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io/"],
    vmType: "EVM",
    testNetwork: false,
  },
  {
    chainId: 80001,
    name: "Mumbai",
    symbol: "MATIC",
    decimals: 18,
    rpcUrls: [
      "https://rpc-mumbai.maticvigil.com/v1/96bf5fa6e03d272fbd09de48d03927b95633726c",
    ],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"],
    type: "ERC1155",
    vmType: "EVM",
    testNetwork: true,
  },
  {
    chainId: 5,
    name: "Goerli",
    symbol: "ETH",
    decimals: 18,
    rpcUrls: [
      "https://eth-goerli.g.alchemy.com/v2/KRnJnphdws3ycVi3v0t9UmGSz8AIrnFA",
    ],
    blockExplorerUrls: ["https://goerli.etherscan.io"],
    type: "ERC1155",
    vmType: "EVM",
    testNetwork: true,
  },
  {
    chainId: 3,
    name: "Ropsten",
    symbol: "ETH",
    decimals: 18,
    rpcUrls: ["https://ropsten.infura.io/v3/96dffb3d8c084dec952c61bd6230af34"],
    blockExplorerUrls: ["https://ropsten.etherscan.io"],
    type: "ERC1155",
    vmType: "EVM",
    testNetwork: true,
  },
  {
    chainId: 10,
    name: "Optimism",
    symbol: "ETH",
    decimals: 18,
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
    type: "ERC1155",
    vmType: "EVM",
    testNetwork: false,
  },
  {
    chainId: 42220,
    name: "Celo",
    symbol: "CELO",
    decimals: 18,
    rpcUrls: ["https://forno.celo.org"],
    blockExplorerUrls: ["https://explorer.celo.org"],
    type: "ERC1155",
    vmType: "EVM",
    testNetwork: false,
  },
];
