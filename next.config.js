/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    LIT_RELAY_API_KEY: process.env.LIT_RELAY_API_KEY,
    ALCHEMY_GOERLI_API_KEY: process.env.ALCHEMY_GOERLI_API_KEY,
    ALCHEMY_GOERLI_GAS_POLICY_ID: process.env.ALCHEMY_GOERLI_GAS_POLICY_ID,
  },
};

module.exports = nextConfig;
