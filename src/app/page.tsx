"use client";

import React, { useEffect, useState } from "react";
import { browserSupportsWebAuthn } from "@simplewebauthn/browser";
import Home from "../components/Home";
import Login from "../components/Login";
import { AppProvider, useAppState } from "../context/context";

export default function HomePage() {
  const isAuthenticated = useAppState();
  console.log("isAuthenticated", isAuthenticated);
  const [isWebAuthnSupported, setIsWebAuthnSupported] = useState(true);
  useEffect(() => {
    const supported =
      browserSupportsWebAuthn() && !navigator.userAgent.includes("Firefox");
    setIsWebAuthnSupported(supported);
  }, []);

  return <AppProvider>{isAuthenticated ? <Login /> : <Home />}</AppProvider>;
}
