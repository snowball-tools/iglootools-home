"use client";

import React from "react";
import Header from "@/components/Header";
import { AuthViews } from "@/store/credentialsSlice";

interface BrowserUnsupportedViewProps {}

const BrowserUnsupportedView = ({}: BrowserUnsupportedViewProps) => {
  return <Header infoView={AuthViews.UNSUPPORTED_BROWSER} />;
};

export default BrowserUnsupportedView;
