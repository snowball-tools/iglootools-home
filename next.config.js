/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  env: {
    LIT_RELAY_API_KEY: process.env.LIT_RELAY_API_KEY,
    ALCHEMY_GOERLI_API_KEY: process.env.ALCHEMY_GOERLI_API_KEY,
    ALCHEMY_GOERLI_GAS_POLICY_ID: process.env.ALCHEMY_GOERLI_GAS_POLICY_ID,
    ALCHEMY_GOERLI_WEBHOOK_ID: process.env.ALCHEMY_GOERLI_WEBHOOK_ID,
    ALCHEMY_SEPOLIA_API_KEY: process.env.ALCHEMY_SEPOLIA_API_KEY,
    ALCHEMY_SEPOLIA_GAS_POLICY_ID: process.env.ALCHEMY_SEPOLIA_GAS_POLICY_ID,
    ALCHEMY_SEPOLIA_WEBHOOK_ID: process.env.ALCHEMY_SEPOLIA_WEBHOOK_ID,
    ALCHEMY_GOERLI_WEBHOOK_SIGNING_KEY:
      process.env.ALCHEMY_GOERLI_WEBHOOK_SIGNING_KEY,
    ALCHEMY_GOERLI_WEBHOOK_SIGNING_KEY:
      process.env.ALCHEMY_GOERLI_WEBHOOK_SIGNING_KEY,
    ALCHEMY_MAINNET_API_KEY: process.env.ALCHEMY_MAINNET_API_KEY,
    ALCHEMY_MAINNET_GAS_POLICY_ID: process.env.ALCHEMY_MAINNET_GAS_POLICY_ID,
    NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
    BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
    NEXT_PUBLIC_APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION,
    NEXT_PUBLIC_SHOW_TEST_VIEW: process.env.NEXT_PUBLIC_SHOW_TEST_VIEW,
  },
  webpack: (config, options) => {
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "");
      })
    );
    return config;
  },
};

module.exports = nextConfig;
