import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import "@/styles/styles.css";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/push-service-worker.")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.log("Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Analytics />
    </Provider>
  );
}

export default MyApp;
