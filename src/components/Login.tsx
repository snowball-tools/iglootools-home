"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppState } from "../context/context";
import {
  DEFAULT_EXP,
  fetchPkps,
  authenticateWithWebAuthn,
  getSessionSigsForWebAuthn,
  registerWithWebAuthn,
} from "../helpers/webauthn";
import { AUTHENTICATED } from "../helpers/actions";
import { initialState } from "../helpers/constants";
import "../styles/styles.css";
import AnimatedComponent from "@/components/AnimatedComponent";

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

export default function Login() {
  const { currentPKP } = useAppState();
  const dispatch = useAppDispatch();

  const [view, setView] = useState(LoginViews.SIGN_UP);
  const [errorMsg, setErrorMsg] = useState(null);

  const [username, setUsername] = useState("");
  const [pkp, setPKP] = useState(currentPKP);

  async function createPKPWithWebAuthn(username: string) {
    setView(LoginViews.REGISTERING);

    const publicKey = await registerWithWebAuthn(username);

    if (publicKey) {
      setPKP(publicKey);
    }

    setView(LoginViews.AUTHENTICATING);

    const auth = await authenticateWithWebAuthn();

    if (auth) {
      setView(LoginViews.MINTED);
    }
  }

  // todo:
  async function authThenGetSessionSigs(event: React.MouseEvent) {
    event.preventDefault();

    setView(LoginViews.AUTHENTICATING);

    try {
      const authData = await authenticateWithWebAuthn();

      let pkpToAuthWith = pkp;
      if (!pkpToAuthWith) {
        const pkps = await fetchPkps(authData);

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
        const sessionSigs = await getSessionSigsForWebAuthn(
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

  const renderView = () => {
    switch (view) {
      case LoginViews.SIGN_IN:
        return (
          <>
            <h1 className="text-4xl font-bold text-white">Sign In</h1>
            <button
              className="w-full border border-indigo-500 bg-indigo-600 bg-opacity-20 px-6 py-3 text-base text-indigo-300 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={authenticateWithWebAuthn}
            >
              Sign In with WebAuthn
            </button>
          </>
        );
      case LoginViews.REGISTERING:
        return (
          <>
            <h1 className="text-4xl font-bold text-white">Registering</h1>
          </>
        );
      case LoginViews.AUTHENTICATING:
        return (
          <>
            <h1 className="text-4xl font-bold text-white">Authenticating</h1>
          </>
        );
      case LoginViews.MINTING:
        return (
          <>
            <h1 className="text-4xl font-bold text-white">Minting</h1>
          </>
        );
      case LoginViews.MINTED:
        return (
          <>
            <h1 className="text-4xl font-bold text-white">Minted</h1>
            <h2 className="text-1xl font-bold text-white">{pkp}</h2>
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
            <h1 className="text-4xl font-bold text-white">Creating Session</h1>
          </>
        );
      case LoginViews.SESSION_CREATED:
        return (
          <>
            <h1 className="text-4xl font-bold text-white">Session Created</h1>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400"
              disabled={true}
            >
              [Soon] Send Transaction via ethersjs
            </button>
          </>
        );
      case LoginViews.ERROR:
        return (
          <>
            <h1 className="text-4xl font-bold text-white">Error</h1>
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
                  placeholder="Passkey Name"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400"
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
