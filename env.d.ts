import { NEXT_PUBLIC_APP_VERSION } from "@/helpers/env";
declare namespace NodeJS {
  interface ProcessEnv {
    ALCHEMY_GOERLI_API_KEY: string;
    ALCHEMY_MAINNET_API_KEY: string;
    ALCHEMY_SEPOLIA_API_KEY: string;
    ALCHEMY_GOERLI_GAS_POLICY_ID: string;
    ALCHEMY_MAINNET_GAS_POLICY_ID: string;
    ALCHEMY_SEPOLIA_GAS_POLICY_ID: string;
    LIT_RELAY_API_KEY: string;
    VERCEL_WEB_ANALYTICS_ID: string;
    ALCHEMY_SEPOLIA_WEBHOOK_ID: string;
    ALCHEMY_GOERLI_WEBHOOK_ID: string;
    ALCHEMY_SEPOLIA_WEBHOOK_SIGNING_KEY: string;
    ALCHEMY_GOERLI_WEBHOOK_SIGNING_KEY: string;
    BUGSNAG_API_KEY: string;
    NEXT_PUBLIC_DEBUG: string;
    NEXT_PUBLIC_APP_VERSION: string;
  }
}
