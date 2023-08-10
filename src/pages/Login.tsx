import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setView,
  setUsername,
  setErrorMsg,
  setMintedNFT,
  LoginViews,
} from "@/store/loginSlice";
import AnimatedComponent from "@/components/AnimatedComponent";
import { DEFAULT_EXP, Passkey } from "@/helpers/webauthn";
import { authenticated, initialState } from "@/store/credentialsSlice";

const passkey = new Passkey();

export default function Login() {
  const { view, username, errorMsg, userOpResult } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch();

  async function createPKPWithWebAuthn() {
    dispatch(setView(LoginViews.REGISTERING));

    const response = await passkey.register(username);

    if (response === null) {
      dispatch(setErrorMsg("Error creating passkey"));
    } else {
      dispatch(setView(LoginViews.AUTHENTICATING));

      const auth = await passkey.authenticate();

      if (auth) {
        dispatch(setView(LoginViews.MINTED));
      }
    }
  }

  async function authThenGetSessionSigs(event: React.MouseEvent) {
    event.preventDefault();

    dispatch(setView(LoginViews.AUTHENTICATING));

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

      dispatch(setView(LoginViews.CREATING_SESSION));

      if (pkpToAuthWith) {
        const sessionSigs = await passkey.getSessionSigs(
          pkpToAuthWith,
          authData,
          "goerli"
        );

        console.log("sessionSigs", sessionSigs);

        dispatch(setView(LoginViews.SESSION_CREATED));

        dispatch(
          authenticated({
            ...initialState,
            isAuthenticated: true,
            currentUsername: username,
            currentPKP: pkpToAuthWith,
            sessionSigs: sessionSigs,
            sessionExpiration: DEFAULT_EXP,
          })
        );
      }
    } catch (e: Error | any) {
      console.error(e);
      dispatch(setErrorMsg(e.message));
    }
  }

  async function sendUserOperation() {
    dispatch(setView(LoginViews.MINTING));
    const result = await passkey.sendUserOperation();
    dispatch(setMintedNFT(result));
    return result;
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
          </>
        );
      case LoginViews.SESSION_CREATED:
        return (
          <>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              Session Created
            </h1>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400 disabled:opacity-20"
              onClick={sendUserOperation}
              disabled={false}
            >
              [WIP] Send User Operation
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
      case LoginViews.IGLOO_NFT_MINTED:
        return (
          <>
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              Igloo NFT Minted
            </h1>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              address: {userOpResult?.request.sender}
            </h3>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              user operation hash:{" "}
              <a
                href={
                  "https://www.jiffyscan.xyz/userOpHash/" +
                  userOpResult?.hash +
                  "?network=goerli"
                }
              >
                {userOpResult?.hash}
              </a>
              <br></br>
            </h2>
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
                  onChange={(e) => dispatch(setUsername(e.target.value))}
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-gray-500 text-white font-bold rounded transition-colors duration-200 hover:bg-gray-400 disabled:opacity-20"
                disabled={username.length === 0}
                onClick={createPKPWithWebAuthn}
              >
                Create Passkey
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
