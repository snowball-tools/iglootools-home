import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Box from "@/components/Box";
import "../styles/globals.css";
import { ErrorBoundary } from "@/helpers/bugsnag";
import TestView from "@/components/TestView";

function MyApp({ Component, pageProps }: AppProps) {
  const setVHVariable = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    setVHVariable();

    window.addEventListener("resize", setVHVariable);
    window.addEventListener("orientationchange", setVHVariable);

    return () => {
      window.removeEventListener("resize", setVHVariable);
      window.removeEventListener("orientationchange", setVHVariable);
    };
  }, []);

  const renderView = () => {
    return (
      <TestView />

      // <Provider store={store}>
      //   <Box>
      //     <Component {...pageProps} />
      //     <Analytics />
      //   </Box>
      // </Provider>
    );
  };

  return ErrorBoundary ? (
    <ErrorBoundary>{renderView()}</ErrorBoundary>
  ) : (
    renderView()
  );
}

export default MyApp;
