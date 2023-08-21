import React from "react";
import { IglooViews } from "@/store/credentialsSlice";
import Header from "@/components/Header";
import Box from "@/components/Box";

interface BrowserUnsupportedProps {}

const BrowserUnsupported = ({}: BrowserUnsupportedProps) => (
  <Box>
    <Header infoView={IglooViews.UNSUPPORTED_BROWSER} />
  </Box>
);

export default BrowserUnsupported;
