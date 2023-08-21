import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Box from "@/components/Box";
import "../styles/globals.css";

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

  return (
    <Provider store={store}>
      <Box>
        <Component {...pageProps} />
        <Analytics />
      </Box>
    </Provider>
  );
}

export default MyApp;
