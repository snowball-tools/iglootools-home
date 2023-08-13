declare namespace NodeJS {
  interface ProcessEnv {
    ALCHEMY_GOERLI_API_KEY: string;
    ALCHEMY_MAINNET_API_KEY: string;
    ALCHEMY_SEPOLIA_API_KEY: string;
    ALCHEMY_GOERLI_GAS_POLICY_ID: string;
    ALCHEMY_MAINNET_GAS_POLICY_ID: string;
    ALCHEMY_SEPOLIA_GAS_POLICY_ID: string;
    ETH_PRIVATE_KEY: string;
    LIT_RELAY_API_KEY: string;
    VERCEL_WEB_ANALYTICS_ID: string;
    NEXT_PUBLIC_DEBUG: string;
  }
}
