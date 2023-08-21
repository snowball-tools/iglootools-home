import React, { useEffect, useState } from "react";
import { browserSupportsWebAuthn } from "@simplewebauthn/browser";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { disconnect } from "@/store/credentialsSlice";
import BrowserUnsupported from "./Views/BrowserUnsupported";
import AuthView from "./Views/AuthView";

const Home = () => {
  const { sessionExpiration } = useSelector(
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
    return <BrowserUnsupported />;
  }

  return <AuthView />;
};

export default Home;
