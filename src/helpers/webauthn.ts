import {
  Snowball,
  CHAINS,
  AuthProvider,
  SmartWalletProvider,
  AlchemySmartWalletProviderKey,
} from "@snowballtools/snowball-ts-sdk";

export const snowball = new Snowball(
  "snowball-test",
  CHAINS.sepolia,
  {
    name: AuthProvider.lit,
  },
  {
    name: SmartWalletProvider.alchemy,
    apiKeys: {
      [AlchemySmartWalletProviderKey.ethereumSepolia]: process.env
        .NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY as string,
      [AlchemySmartWalletProviderKey.ethereumSepolia_gasPolicyId]: process.env
        .NEXT_PUBLIC_ALCHEMY_SEPOLIA_GAS_POLICY_ID as string,
    },
  }
);
