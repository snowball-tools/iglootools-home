/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LIT_RELAY_API_KEY: process.env.LIT_RELAY_API_KEY,
    ALCHEMY_GOERLI_API_KEY: process.env.ALCHEMY_GOERraLI_API_KEY,
    ALCHEMY_GOERLI_GAS_POLICY_ID: process.env.ALCHEMY_GOERLI_GAS_POLICY_ID,
    ALCHEMY_SEPOLIA_API_KEY: process.env.ALCHEMY_SEPOLIA_API_KEY,
    ALCHEMY_SEPOLIA_GAS_POLICY_ID: process.env.ALCHEMY_SEPOLIA_GAS_POLICY_ID,
    ALCHEMY_MAINNET_API_KEY: process.env.ALCHEMY_MAINNET_API_KEY,
    ALCHEMY_MAINNET_GAS_POLICY_ID: process.env.ALCHEMY_MAINNET_GAS_POLICY_ID,
    ETH_PRIVATE_KEY: process.env.ETH_PRIVATE_KEY,
    NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
  },
};

module.exports = nextConfig;
