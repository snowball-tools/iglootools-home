import { Chain, alchemyAPIKey, getChainWebhookID } from "@/helpers/chains";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  res.status(200).json({ success: true });

  console.log("Webhook received", req.body);
}

export async function updateWebhookAddressesForChain(
  chain: Chain,
  newAddresses: string[] = [],
  removeAddress: string[] = []
): Promise<void> {
  console.log(
    "adding address " + newAddresses,
    "removing address " + removeAddress
  );

  const body = {
    webhook_id: getChainWebhookID(chain),
    addresses_to_add: [newAddresses],
    addresses_to_remove: [removeAddress],
  };

  try {
    const response = await fetch(
      "https://dashboard.alchemyapi.io/api/update-webhook-addresses",
      {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          "X-Alchemy-Token": alchemyAPIKey(chain),
        },
      }
    );

    const json = await response.json();
    console.log(
      "sent webhook update for addresses: ",
      newAddresses,
      " and removed: ",
      removeAddress
    );
    console.log(json);
  } catch (err) {
    console.error(err);
  }
}
