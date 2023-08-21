import React from "react";
import { IglooViews } from "@/store/credentialsSlice";
import Header from "@/components/Header";
import Box from "@/components/Box";
import { Head } from "next/document";

interface BrowserUnsupportedProps {}

const BrowserUnsupported = ({}: BrowserUnsupportedProps) => (
  <>
    <Head>
      <title>Igloo</title>
      <meta name="description" content="MPC Passkey Wallet" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="favicon.ico" />
    </Head>
    <Box>
      <Header infoView={IglooViews.UNSUPPORTED_BROWSER} />
    </Box>
  </>
);

export default BrowserUnsupported;
