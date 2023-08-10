import { Address, Hex, createWalletClient, http, custom } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { ETH_PRIVATE_KEY, ALCHEMY_GOERLI_API_KEY } from "@/helpers/env";
import { goerli } from "viem/chains";

export async function sendInitGas(toAddress: Address) {
  const account = privateKeyToAccount(("0x" + ETH_PRIVATE_KEY) as Address);

  const client = createWalletClient({
    account: account,
    chain: goerli,
    transport: http(
      "https://eth-goerli.g.alchemy.com/v2/" + ALCHEMY_GOERLI_API_KEY
    ),
  });

  try {
    const transactionReceipt = await client.sendTransaction({
      to: toAddress,
      value: BigInt(10000),
    });
    console.log("Transaction successful:", transactionReceipt);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
}
