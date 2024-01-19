"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setView,
  setErrorMsg,
  AuthViews,
  disconnect,
  authenticated,
} from "../../store/credentialsSlice";
import { snowball } from "../../helpers/webauthn";
import InitialView from "./InitialView";
import SignUpView from "./SignUpView";
import Header from "../../components/Header";
import StickyButtonGroup from "@/components/StickyButtonGroup";
import LoadingAnimation from "@/components/LoadingAnimation";
import { RootState } from "@/store/store";
import { logErrorMsg } from "@/helpers/bugsnag";
import va from "@vercel/analytics";

export default function AuthView() {
  const [username, setUsername] = React.useState("");
  const { view, errorMsg } = useSelector(
    (state: RootState) => state.credentials
  );
  const dispatch = useDispatch();

  async function createPKPWithWebAuthn() {
    va.track("Signup Start");
    dispatch(setView(AuthViews.REGISTERING));

    try {
      await snowball.register(username);

      dispatch(setView(AuthViews.MINTED));
    } catch (e) {
      va.track("Signup Failure");
      logErrorMsg(`${e}`);
      dispatch(setErrorMsg("Error creating passkey"));
    }
  }

  async function authThenGetSessionSigs() {
    va.track("Auth Start");

    dispatch(setView(AuthViews.AUTHENTICATING));

    try {
      await snowball.authenticate();

      const address = await snowball.getAddress();

      dispatch(authenticated(address));
    } catch (e) {
      va.track("Auth Failed", { error: `${e}` });
      logErrorMsg(`${e}`);
      dispatch(setErrorMsg("Error authenticating passkey"));
    }
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
            <Header infoView={view} />
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
            setUsername={(newUsername) => setUsername(newUsername)}
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
