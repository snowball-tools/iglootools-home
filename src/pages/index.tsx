import React, { useEffect, useState } from "react";
import Head from "next/head";
import { browserSupportsWebAuthn } from "@simplewebauthn/browser";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { disconnect } from "@/store/credentialsSlice";
import BrowserUnsupportedView from "./Views/BrowserUnsupportedView";
import AuthView from "./Views/AuthView";
import WalletView from "./Views/WalletView";
import va from "@vercel/analytics";

const Home = () => {
  const { isAuthenticated, sessionExpiration } = useSelector(
    (state: RootState) => state.credentials
  );
  const dispatch = useDispatch();

  const [isWebAuthnSupported, setIsWebAuthnSupported] = useState(true);

  useEffect(() => {
    const supported =
      browserSupportsWebAuthn() && !navigator.userAgent.includes("Firefox");
    setIsWebAuthnSupported(supported);
  }, []);

  useEffect(() => {
    async function checkSession() {
      if (sessionExpiration) {
        const sessionDate = new Date(sessionExpiration);
        const now = new Date();
        if (sessionDate < now) {
          dispatch(disconnect());
        }
      }
    }

    checkSession();
  }, [sessionExpiration]);

  if (!isWebAuthnSupported) {
    return <BrowserUnsupportedView />;
  }

  const renderView = () => {
    if (!isWebAuthnSupported) {
      va.track("Unsupported Browser");
      return <BrowserUnsupportedView />;
    } else if (isAuthenticated) {
      va.track("Authenticated User");
      return <WalletView />;
    }
    va.track("Initial View");
    return <AuthView />;
  };

  return (
    <>
      <Head>
        <title>Igloo</title>
        <meta name="description" content="MPC Passkey Wallet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head>
      {renderView()}
    </>
  );
};

export default Home;
