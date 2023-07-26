"use client";

import React, { useEffect, useState } from "react";
import { browserSupportsWebAuthn } from "@simplewebauthn/browser";
import Home from "../components/Home";
import Login from "../components/Login";
import { AppProvider } from "../context/context";

export default function HomePage() {
  // hardcoded for now
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isWebAuthnSupported, setIsWebAuthnSupported] = useState(true);
  useEffect(() => {
    const supported =
      browserSupportsWebAuthn() && !navigator.userAgent.includes("Firefox");
    setIsWebAuthnSupported(supported);
  }, []);

  return <AppProvider>{isAuthenticated ? <Home /> : <Login />}</AppProvider>;
}
