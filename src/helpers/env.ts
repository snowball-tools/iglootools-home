export const ALCHEMY_GOERLI_API_KEY = process.env
  .ALCHEMY_GOERLI_API_KEY as string;
export const ALCHEMY_MAINNET_API_KEY = process.env
  .ALCHEMY_MAINNET_API_KEY as string;
export const ALCHEMY_SEPOLIA_API_KEY = process.env
  .ALCHEMY_SEPOLIA_API_KEY as string;
export const ALCHEMY_GOERLI_GAS_POLICY_ID = process.env
  .ALCHEMY_GOERLI_GAS_POLICY_ID as string;
export const ALCHEMY_MAINNET_GAS_POLICY_ID = process.env
  .ALCHEMY_MAINNET_GAS_POLICY_ID as string;
export const ALCHEMY_SEPOLIA_GAS_POLICY_ID = process.env
  .ALCHEMY_SEPOLIA_GAS_POLICY_ID as string;
export const LIT_RELAY_API_KEY = process.env.LIT_RELAY_API_KEY as string;
export const VERCEL_WEB_ANALYTICS_ID = process.env
  .VERCEL_WEB_ANALYTICS_ID as string;
export const NEXT_PUBLIC_DEBUG = process.env.NEXT_PUBLIC_DEBUG === "true";
export const ALCHEMY_GOERLI_WEBHOOK_ID = process.env
  .ALCHEMY_GOERLI_WEBHOOK_ID as string;
export const ALCHEMY_SEPOLIA_WEBHOOK_ID = process.env
  .ALCHEMY_SEPOLIA_WEBHOOK_ID as string;
export const ALCHEMY_GOERLI_WEBHOOK_SIGNING_KEY = process.env
  .ALCHEMY_GOERLI_WEBHOOK_SIGNING_KEY as string;
export const ALCHEMY_SEPOLIA_WEBHOOK_SIGNING_KEY = process.env
  .ALCHEMY_SEPOLIA_WEBHOOK_SIGNING_KEY as string;
export const BUGSNAG_API_KEY = process.env.BUGSNAG_API_KEY as string;
export const NEXT_PUBLIC_APP_VERSION = process.env
  .NEXT_PUBLIC_APP_VERSION as string;
export const NEXT_PUBLIC_SHOW_TEST_VIEW =
  process.env.NEXT_PUBLIC_SHOW_TEST_VIEW === "true" && NEXT_PUBLIC_DEBUG;
