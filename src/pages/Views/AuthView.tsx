import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  setView,
  setErrorMsg,
  setCurrentPKP,
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
import MintedIglooNFTView from "./MintedIglooNFTView";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function AuthView() {
  const {
    view,
    username,
    currentAppChain,
    appChains,
    currentPKP,
    currentPKPEthAddress,
    sessionSigs,
    ethAddress,
    errorMsg,
    userOpHash,
    nftId,
  } = useSelector((state: RootState) => state.credentials);
  const dispatch = useDispatch();

  async function createPKPWithWebAuthn() {
    dispatch(setView(AuthViews.REGISTERING));

    try {
      const response = await registerPasskey(username);

      dispatch(
        setCurrentPKP({
          currentPKP: response.pkpPublicKey,
          currentPKPEthAddress: response.pkpEthAddress,
        })
      );

      dispatch(setView(AuthViews.MINTING));

      const auth = await authenticatePasskey();

      await getSessionSig(response.pkpPublicKey, response.pkpEthAddress, auth);
    } catch (e) {
      console.log(e);
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
      }

      await getSessionSig(pkp, pkpEthAddress, auth);
    } catch (e) {
      console.log(e);
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

    const pkpEthWallet = await createPkpEthersWallet(
      pkpPublicKey,
      pkpEthAddress,
      sessionSigs,
      currentAppChain
    );

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
      case AuthViews.IGLOO_NFT_MINTING:
      case AuthViews.MINTING:
        return (
          <>
            <Header
              infoView={view}
              mintingNFT={view === AuthViews.IGLOO_NFT_MINTING}
            />
            <LoadingAnimation
              animationDuration={view === AuthViews.IGLOO_NFT_MINTING ? 4 : 2.5}
            />
          </>
        );
      case AuthViews.MINTED:
        return <Header infoView={view} />;
      case AuthViews.IGLOO_NFT_MINTED:
        return (
          <MintedIglooNFTView
            nftLabel={nftId ? `IglooNFT #${nftId}` : "IglooNFT"}
            chain={currentAppChain}
            primaryActionAfterMint={() =>
              window.open(
                nftId
                  ? `https://testnets.opensea.io/assets/${currentAppChain.name.toLowerCase()}/${
                      currentAppChain.iglooNFTAddress
                    }/${nftId}`
                  : `https://www.jiffyscan.xyz/userOpHash/${userOpHash}?network=${currentAppChain.name.toLowerCase()}`,
                "_blank"
              )
            }
            returnToWalletAction={() =>
              dispatch(setView(AuthViews.WALLET_HOME))
            }
          />
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
