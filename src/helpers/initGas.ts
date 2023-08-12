import { Address, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { ETH_PRIVATE_KEY } from "@/helpers/env";
import { Chain, alchemyGasPolicyId } from "./chains";

export async function sendInitGas(toAddress: Address, chain: Chain) {
  const account = privateKeyToAccount(("0x" + ETH_PRIVATE_KEY) as Address);

  const client = createWalletClient({
    account: account,
    chain: chain.viemChain,
    transport: http(chain.rpcUrls[0] + alchemyGasPolicyId(chain)),
  });

  try {
    const transactionReceipt = await client.sendTransaction({
      to: toAddress,
      value: BigInt(10000),
      chain: chain.viemChain,
    });

    console.log("Transaction successful:", transactionReceipt);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
}
