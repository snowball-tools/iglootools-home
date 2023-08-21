import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import type { AppProps } from "next/app";
import { InnerApp } from "@/pages/Views/InnerApp";
import "../styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <Provider store={store}>
      <InnerApp pageProps={pageProps} Component={Component} router={router} />
    </Provider>
  );
}

export default MyApp;
