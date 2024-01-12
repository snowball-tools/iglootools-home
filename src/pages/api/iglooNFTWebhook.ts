import {
  Chain,
  alchemyAPIKey,
  getChainWebhookID,
  getChainWebhookSigningKey,
} from "@/helpers/chains";
import type { NextApiRequest, NextApiResponse } from "next";
import * as crypto from "crypto";
import { logMetadata, logErrorMsg, logInfo } from "@/helpers/bugsnag";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  res.status(200).json({ success: true });

  logInfo("webhook handler", "Webhook received");
  logMetadata("webhook", "body", JSON.stringify(req.body));

  // check if webhook is valid
  if (
    isValidSignatureForStringBody(
      req.body,
      req.headers["x-alchemy-signature"] as string,
      getChainWebhookSigningKey(req.body.network)
    )
  ) {
  }
}

function isValidSignatureForStringBody(
  body: string,
  signature: string,
  signingKey: string
): boolean {
  const hmac = crypto.createHmac("sha256", signingKey);
  hmac.update(body, "utf8");
  const digest = hmac.digest("hex");
  return signature === digest;
}

export async function updateWebhookAddressesForChain(
  chain: Chain,
  newAddresses: string[] = [],
  removeAddress: string[] = []
): Promise<void> {
  logInfo(
    "updateWebhookAddressesForChain",
    `adding address ${newAddresses}, removing address ${removeAddress}`
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
    logInfo(
      "updateWebhookAddressesForChain",
      `sent webhook update for addresses: ${newAddresses} and removed: ${removeAddress}`
    );
    logInfo("updateWebhookAddressesForChain", json);
  } catch (err) {
    logErrorMsg(`${err}`);
  }
}
