"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppState } from "../context/context";
import { DEFAULT_EXP, Passkey } from "../helpers/webauthn";
import { AUTHENTICATED } from "../helpers/actions";
import { initialState } from "../helpers/constants";
import "../styles/styles.css";
import AnimatedComponent from "@/components/AnimatedComponent";
import { AuthMethod, type SessionSigsMap } from "@lit-protocol/types";

const LoginViews = {
  SIGN_UP: "sign_up",
  SIGN_IN: "sign_in",
  REGISTERING: "registering",
  AUTHENTICATING: "authenticating",
  MINTING: "minting",
  MINTED: "minted",
  CREATING_SESSION: "creating_session",
  SESSION_CREATED: "session_created",
  ERROR: "error",
};

const passkey = new Passkey();

export default function Login() {
  const { currentPKP } = useAppState();
  const dispatch = useAppDispatch();

  const [view, setView] = useState(LoginViews.SIGN_UP);
  const [errorMsg, setErrorMsg] = useState("");

  const [username, setUsername] = useState("");

  async function createPKPWithWebAuthn(username: string) {
    setView(LoginViews.REGISTERING);

    const response = await passkey.register(username);

    setView(LoginViews.AUTHENTICATING);

    const auth = await passkey.authenticate();

    if (auth) {
      setView(LoginViews.MINTED);
    }
  }

  async function authThenGetSessionSigs(event: React.MouseEvent) {
    event.preventDefault();

    setView(LoginViews.AUTHENTICATING);

    try {
      const authData = await passkey.authenticate();

      let pkpToAuthWith = passkey.pkpPublicKey;
      if (!pkpToAuthWith) {
        const pkps = await passkey.fetchPkps(authData);

        console.log("pkps", pkps);
        if (pkps.length === 0) {
          throw new Error(
            "No PKPs found for this passkey. Please register a new passkey to mint a new PKP."
          );
        } else {
          pkpToAuthWith = pkps[0].publicKey;
        }
      }

      console.log("creating session", pkpToAuthWith);

      setView(LoginViews.CREATING_SESSION);

      if (pkpToAuthWith) {
        const sessionSigs = await passkey.getSessionSigs(
          pkpToAuthWith,
          authData
        );

        console.log("sessionSigs", sessionSigs);

        setView(LoginViews.SESSION_CREATED);

        dispatch({
          type: AUTHENTICATED,
          payload: {
            ...initialState,
            isAuthenticated: true,
            currentUsername: username,
            currentPKP: pkpToAuthWith,
            sessionSigs: sessionSigs,
            sessionExpiration: DEFAULT_EXP,
          },
        });
      }
    } catch (e: Error | any) {
      console.error(e);
      setErrorMsg(e.message);
      setView(LoginViews.ERROR);
    }
  }

  async function sendTranaction(toAddress: string) {
    const tx = await passkey.sendTransaction(toAddress);
    return tx;
  }

  const renderView = () => {
    switch (view) {
      case LoginViews.SIGN_IN:
        return (
          <>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              Sign In
            </h1>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400"
              onClick={authThenGetSessionSigs}
            >
              Sign In
            </button>
          </>
        );
      case LoginViews.REGISTERING:
        return (
          <>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              Registering
            </h1>
          </>
        );
      case LoginViews.AUTHENTICATING:
        return (
          <>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              Authenticating
            </h1>
          </>
        );
      case LoginViews.MINTING:
        return (
          <>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              Minting
            </h1>
          </>
        );
      case LoginViews.MINTED:
        return (
          <>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              Minted
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              {passkey.getEthAddress()}
            </h2>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400"
              onClick={authThenGetSessionSigs}
            >
              Get SessionSig
            </button>
          </>
        );
      case LoginViews.CREATING_SESSION:
        return (
          <>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              Creating Session
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              {passkey.getEthAddress()}
            </h2>
          </>
        );
      case LoginViews.SESSION_CREATED:
        return (
          <>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              Session Created
            </h1>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              {passkey.getEthAddress()}
            </h2>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400 disabled:opacity-20"
              onClick={() =>
                sendTranaction("0x669E4aCd20Aa30ABA80483fc8B82aeD626e60B60")
              }
              disabled={true}
            >
              [WIP] Send Transaction via ethersjs
            </button>
          </>
        );
      case LoginViews.ERROR:
        return (
          <>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              Error
            </h1>
            <p className="text-white">{errorMsg}</p>
          </>
        );
      case LoginViews.SIGN_UP:
      default:
        return (
          <>
            <div className="flex-grow">
              <div className="relative p-5 bg-gray-700 rounded">
                <input
                  className="w-full h-full text-lg bg-transparent text-white outline-none"
                  style={{ caretColor: "white" }}
                  value={username}
                  placeholder="Name (ie. Taylor Swift)"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400 disabled:opacity-20"
                disabled={username.length === 0}
                onClick={() => createPKPWithWebAuthn(username)}
              >
                Submit
              </button>
              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400"
                onClick={authThenGetSessionSigs}
              >
                Log In
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <AnimatedComponent key={view}>{renderView()}</AnimatedComponent>
    </div>
  );
}
