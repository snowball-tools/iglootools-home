import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setView,
  setUsername,
  setErrorMsg,
  setMintedNFT,
  setCurrentPKP,
  LoginViews,
  setSessionSig,
} from "../store/credentialsSlice";
import AnimatedComponent from "../components/AnimatedComponent";
import {
  authenticatePasskey,
  createPkpEthersWallet,
  fetchPkpsForAuthMethod,
  getSessionSigs,
  registerPasskey,
  sendUserOperation,
} from "../helpers/webauthn";
import { authenticated } from "../store/credentialsSlice";
import { NEXT_PUBLIC_DEBUG } from "../helpers/env";

export default function Login() {
  const {
    view,
    username,
    errorMsg,
    userOpResult,
    currentAppChain,
    currentAuthMethod,
    currentPKP,
    currentPKPEthAddress,
    sessionSigs,
  } = useSelector((state: RootState) => state.credentials);
  const dispatch = useDispatch();

  async function createPKPWithWebAuthn() {
    dispatch(setView(LoginViews.REGISTERING));

    const response = await registerPasskey(username);

    if (response && response.pkpEthAddress && response.pkpPublicKey) {
      dispatch(
        setCurrentPKP({
          currentPKP: response.pkpPublicKey,
          currentPKPEthAddress: response.pkpEthAddress,
        })
      );

      const auth = await authenticatePasskey();

      if (auth) {
        dispatch(authenticated(auth));
        dispatch(setView(LoginViews.MINTED));
      } else {
        dispatch(setErrorMsg("Error authenticating passkey"));
      }
    } else {
      dispatch(setErrorMsg("Error creating passkey"));
    }
  }

  async function authThenGetSessionSigs() {
    let pkp: string | undefined = currentPKP;
    let ethAddress: string | undefined = currentPKPEthAddress;

    dispatch(setView(LoginViews.AUTHENTICATING));

    try {
      const auth = await authenticatePasskey();

      if (pkp === undefined || ethAddress === undefined) {
        const pkps = await fetchPkpsForAuthMethod(auth);

        if (pkps.length === 0) {
          dispatch(setErrorMsg("Error authenticating passkey"));
          return;
        }

        pkp = pkps[0].publicKey;
        ethAddress = pkps[0].ethAddress;
      }

      dispatch(setView(LoginViews.CREATING_SESSION));

      const sessionSigs = await getSessionSigs(
        pkp,
        ethAddress,
        auth,
        currentAppChain
      );

      if (sessionSigs) {
        dispatch(
          setSessionSig({
            currentPKP: pkp,
            currentPKPEthAddress: ethAddress,
            currentAuthMethod: auth,
            sessionSigs: sessionSigs,
            view: LoginViews.SESSION_CREATED,
          })
        );
      } else {
        dispatch(setErrorMsg("Error creating session"));
      }
    } catch (e) {
      console.log(e);
      dispatch(setErrorMsg("Error authenticating passkey"));
    }
  }

  async function sendUserOp() {
    dispatch(setView(LoginViews.MINTING));

    if (currentPKP && currentPKPEthAddress && currentAppChain && sessionSigs) {
      const pkpEthWallet = await createPkpEthersWallet(
        currentPKP,
        currentPKPEthAddress,
        sessionSigs,
        currentAppChain
      );

      if (pkpEthWallet) {
        const result = await sendUserOperation(
          currentPKPEthAddress,
          pkpEthWallet,
          currentAppChain
        );
        if (result) {
          dispatch(setMintedNFT(result));
        } else {
          dispatch(setErrorMsg("Error minting NFT"));
        }
        return result;
      } else {
        dispatch(setErrorMsg("Error sending user operation"));
      }
    } else {
      dispatch(setErrorMsg("Error creating pkp eth wallet"));
    }
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
              onClick={sendUserOp}
            >
              Send User Operation
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
              eth address:{" "}
              <a
                className="text-blue-500 hover:underline"
                href={
                  "https://goerli.etherscan.io/address/" +
                  userOpResult?.request.sender
                }
              >
                {userOpResult?.request.sender}
              </a>
            </h3>
            <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">
              user operation hash:{" "}
              <a
                className="text-blue-500 hover:underline"
                href={
                  "https://www.jiffyscan.xyz/userOpHash/" +
                  userOpResult?.hash +
                  "?network=goerli"
                }
              >
                {userOpResult?.hash}
              </a>
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
      <AnimatedComponent animKey={view}>{renderView()}</AnimatedComponent>
    </div>
  );
}
