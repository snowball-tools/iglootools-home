import {
  Snowball,
  CHAINS,
  AuthProvider,
  SmartWalletProvider,
  AlchemySmartWalletProviderKey,
} from "@snowballtools/snowball-ts-sdk";
import {
  ALCHEMY_GOERLI_API_KEY,
  ALCHEMY_GOERLI_GAS_POLICY_ID,
  ALCHEMY_SEPOLIA_API_KEY,
  ALCHEMY_SEPOLIA_GAS_POLICY_ID,
} from "./env";

export const snowball = new Snowball(
  "snowball-test",
  CHAINS.goerli,
  {
    name: AuthProvider.lit,
  },
  {
    name: SmartWalletProvider.alchemy,
    apiKeys: {
      [AlchemySmartWalletProviderKey.ethereumGoerli]: ALCHEMY_GOERLI_API_KEY,
      [AlchemySmartWalletProviderKey.ethereumGoerli_gasPolicyId]:
        ALCHEMY_GOERLI_GAS_POLICY_ID,
      [AlchemySmartWalletProviderKey.ethereumSepolia]: ALCHEMY_SEPOLIA_API_KEY,
      [AlchemySmartWalletProviderKey.ethereumSepolia_gasPolicyId]:
        ALCHEMY_SEPOLIA_GAS_POLICY_ID,
    },
  }
);
