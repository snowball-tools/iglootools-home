import React, { useEffect } from "react";
import { AppProps } from "next/app";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { STATE_KEY } from "@/helpers/constants";
import {
  AuthViews,
  CredentialState,
  disconnect,
  restoreState,
} from "@/store/credentialsSlice";
import debounce from "lodash.debounce";
import Box from "@/components/Box";
import { Analytics } from "@vercel/analytics/react";

export function InnerApp({ Component, pageProps, router }: AppProps) {
  const state = useSelector((state: RootState) => state.credentials);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedState = localStorage.getItem(STATE_KEY);
      if (storedState) {
        const parsedState = JSON.parse(storedState) as CredentialState;
        console.log(parsedState);
        if (
          parsedState.isAuthenticated &&
          (parsedState.view === AuthViews.WALLET_HOME ||
            parsedState.view === AuthViews.IGLOO_NFT_MINTED)
        ) {
          dispatch(restoreState(parsedState));
          return;
        }
        dispatch(disconnect());
      }
    }
  }, []);

  const saveStateToLocalStorage = debounce(() => {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }, 1000);

  useEffect(() => {
    saveStateToLocalStorage();
  }, [state]);

  return (
    <Box>
      <Component {...pageProps} />
      <Analytics />
    </Box>
  );
}
