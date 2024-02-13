import {
  Snowball,
  CHAINS,
  AuthProvider,
  SmartWalletProvider,
  AlchemySmartWalletProviderKey,
} from "@snowballtools/snowball-ts-sdk";

export const snowball = new Snowball(
  "snowball-test",
  CHAINS.goerli,
  {
    name: AuthProvider.lit,
  },
  {
    name: SmartWalletProvider.alchemy,
    apiKeys: {
      [AlchemySmartWalletProviderKey.ethereumGoerli]: process.env
        .NEXT_PUBLIC_ALCHEMY_GOERLI_API_KEY as string,
      [AlchemySmartWalletProviderKey.ethereumGoerli_gasPolicyId]: process.env
        .NEXT_PUBLIC_ALCHEMY_GOERLI_GAS_POLICY_ID as string,
      [AlchemySmartWalletProviderKey.ethereumSepolia]: process.env
        .NEXT_PUBLIC_ALCHEMY_SEPOLIA_API_KEY as string,
      [AlchemySmartWalletProviderKey.ethereumSepolia_gasPolicyId]: process.env
        .NEXT_PUBLIC_ALCHEMY_SEPOLIA_GAS_POLICY_ID as string,
    },
  }
);
