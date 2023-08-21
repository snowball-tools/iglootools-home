import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setView,
  setErrorMsg,
  AuthViews,
  setSessionSig,
  disconnect,
  setUsername,
} from "../../store/credentialsSlice";
import {
  authenticatePasskey,
  createPkpEthersWallet,
  fetchPkpsForAuthMethod,
  getSmartWalletAddress,
  getSessionSigs,
  registerPasskey,
} from "../../helpers/webauthn";
import InitialView from "./InitialView";
import SignUpView from "./SignUpView";
import Header from "../../components/Header";
import { AuthMethod } from "@lit-protocol/types";
import StickyButtonGroup from "@/components/StickyButtonGroup";
import LoadingAnimation from "@/components/LoadingAnimation";
import { RootState } from "@/store/store";
import { logErrorMsg, logUser } from "@/helpers/bugsnag";

export default function AuthView() {
  const {
    view,
    username,
    currentAppChain,
    currentPKP,
    currentPKPEthAddress,
    errorMsg,
  } = useSelector((state: RootState) => state.credentials);
  const dispatch = useDispatch();

  async function createPKPWithWebAuthn() {
    dispatch(setView(AuthViews.REGISTERING));

    try {
      const response = await registerPasskey(username);

      logUser(response.pkpPublicKey, username);

      dispatch(setView(AuthViews.MINTED));
    } catch (e) {
      logErrorMsg(`${e}`);
      dispatch(setErrorMsg("Error creating passkey"));
    }
  }

  async function authThenGetSessionSigs() {
    let pkp: string | undefined = currentPKP;
    let pkpEthAddress: string | undefined = currentPKPEthAddress;

    dispatch(setView(AuthViews.AUTHENTICATING));

    try {
      const auth = await authenticatePasskey();

      if (pkp === undefined || pkpEthAddress === undefined) {
        const pkps = await fetchPkpsForAuthMethod(auth);

        pkp = pkps[0].publicKey;
        pkpEthAddress = pkps[0].ethAddress;

        logUser(pkp, pkpEthAddress);
      }

      await getSessionSig(pkp, pkpEthAddress, auth);
    } catch (e) {
      logErrorMsg(`${e}`);
      dispatch(setErrorMsg("Error authenticating passkey"));
    }
  }

  async function getSessionSig(
    pkpPublicKey: string,
    pkpEthAddress: string,
    auth: AuthMethod
  ) {
    const sessionSigs = await getSessionSigs(
      pkpPublicKey,
      pkpEthAddress,
      auth,
      currentAppChain
    );

    const pkpEthWallet = await createPkpEthersWallet(pkpPublicKey, sessionSigs);

    const smartWalletAddress = await getSmartWalletAddress(
      pkpEthWallet,
      currentAppChain
    );

    dispatch(
      setSessionSig({
        currentPKP: pkpPublicKey,
        currentPKPEthAddress: pkpEthAddress,
        currentAuthMethod: auth,
        sessionSigs: sessionSigs,
        ethAddress: smartWalletAddress,
      })
    );
  }

  const renderView = () => {
    switch (view) {
      case AuthViews.REGISTERING:
      case AuthViews.AUTHENTICATING:
      case AuthViews.MINTING:
        return (
          <>
            <Header infoView={view} />
            <LoadingAnimation
              animationDuration={view === AuthViews.IGLOO_NFT_MINTING ? 5 : 2.5}
            />
          </>
        );
      case AuthViews.MINTED:
        return (
          <>
            <Header infoView={view} />;
            <StickyButtonGroup
              buttons={[
                {
                  label: "Log in",
                  onClick: authThenGetSessionSigs,
                  bgColor: "bg-cyan-200",
                  textColor: "text-black",
                  disabledColor:
                    "disabled:bg-disabled-gray disabled:text-white/10",
                },
              ]}
            />
          </>
        );
      case AuthViews.ERROR:
        return (
          <>
            <Header infoView={view} errorMsg={errorMsg ?? ""} />
            <StickyButtonGroup
              buttons={[
                {
                  label: "Try again",
                  onClick: () => dispatch(disconnect()),
                  bgColor: "bg-cyan-200",
                  textColor: "text-black",
                  disabledColor:
                    "disabled:bg-disabled-gray disabled:text-white/10",
                },
              ]}
            />
          </>
        );
      case AuthViews.SIGN_UP:
        return (
          <SignUpView
            signIn={authThenGetSessionSigs}
            createNewPasskey={createPKPWithWebAuthn}
            username={username}
            setUsername={(newUsername) => dispatch(setUsername(newUsername))}
          />
        );
      default:
        return (
          <InitialView
            creatNewPasskey={() => dispatch(setView(AuthViews.SIGN_UP))}
            useExistingPasskey={authThenGetSessionSigs}
          />
        );
    }
  };

  return renderView();
}
