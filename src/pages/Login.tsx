import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  setView,
  setErrorMsg,
  setMintedNFT,
  setCurrentPKP,
  LoginViews,
  setSessionSig,
  setEthAddressAndPKPWallet,
} from "../store/credentialsSlice";
import {
  authenticatePasskey,
  createPkpEthersWallet,
  fetchPkpsForAuthMethod,
  getSmartWalletAddress,
  getSessionSigs,
  registerPasskey,
  sendUserOperation,
} from "../helpers/webauthn";
import { authenticated } from "../store/credentialsSlice";
import InitialView from "./InitialView";
import SignInView from "./SignInView";
import InfoView from "./InfoView";
import { AuthMethod } from "@lit-protocol/types";

export default function Login() {
  const {
    view,
    username,
    currentAppChain,
    currentPKP,
    currentPKPEthAddress,
    sessionSigs,
    ethAddress,
  } = useSelector((state: RootState) => state.credentials);
  const dispatch = useDispatch();

  async function createPKPWithWebAuthn() {
    dispatch(setView(LoginViews.REGISTERING));

    try {
      const response = await registerPasskey(username);

      dispatch(
        setCurrentPKP({
          currentPKP: response.pkpPublicKey,
          currentPKPEthAddress: response.pkpEthAddress,
        })
      );

      const auth = await authenticatePasskey();

      await getSessionSig(response.pkpPublicKey, response.pkpEthAddress, auth);
    } catch (e) {
      console.log(e);
      dispatch(setErrorMsg("Error creating passkey"));
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

    dispatch(
      setSessionSig({
        currentPKP: pkpPublicKey,
        currentPKPEthAddress: pkpEthAddress,
        currentAuthMethod: auth,
        sessionSigs: sessionSigs,
        view: LoginViews.WALLET_HOME,
      })
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
      setEthAddressAndPKPWallet({
        ethAddress: smartWalletAddress,
      })
    );
  }

  async function authThenGetSessionSigs() {
    let pkp: string | undefined = currentPKP;
    let pkpEthAddress: string | undefined = currentPKPEthAddress;

    dispatch(setView(LoginViews.AUTHENTICATING));

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

  async function sendUserOp() {
    dispatch(setView(LoginViews.MINTING));

    if (currentPKP && currentPKPEthAddress && currentAppChain && sessionSigs) {
      try {
        const pkpEthWallet = await createPkpEthersWallet(
          currentPKP,
          currentPKPEthAddress,
          sessionSigs,
          currentAppChain
        );

        const result = await sendUserOperation(
          currentPKPEthAddress,
          pkpEthWallet,
          currentAppChain
        );

        dispatch(setMintedNFT(result));
        return result;
      } catch (e) {
        console.log(e);
        dispatch(setErrorMsg("Error sending user operation"));
      }
    } else {
      dispatch(setErrorMsg("Error sending user operation"));
    }
  }

  const renderView = () => {
    switch (view) {
      case LoginViews.REGISTERING:
      case LoginViews.AUTHENTICATING:
      case LoginViews.MINTING:
      case LoginViews.MINTED:
      case LoginViews.IGLOO_NFT_MINTED:
        return <InfoView infoView={view} sendUserOp={sendUserOp} />;
      case LoginViews.ERROR:
        return (
          <>
            <InfoView infoView={view} sendUserOp={sendUserOp} />;
            <div className="flex flex-col justify-end gap-3 w-full">
              <button
                className="bg-black flex flex-col justify-center h-12 shrink-0 items-center rounded-[41px] text-center text-sm font-SF_Pro_Rounded font-semibold leading-[20px] text-white"
                onClick={() => dispatch(setView(LoginViews.INITIAL_VIEW))}
              >
                Try again
              </button>
            </div>
          </>
        );
      case LoginViews.WALLET_HOME:
        return (
          <>
            <InfoView infoView={view} sendUserOp={sendUserOp} />
            <div className="flex flex-col justify-between items-center">
              <div className="text-center text-xl font-['SF_Pro_Rounded'] font-bold leading-[40px] self-center">
                Your Smart Wallet
              </div>
              <div className="text-center text-sm font-SF_Pro_Rounded font-medium leading-[20px] w-full break-all">
                {ethAddress}
              </div>
            </div>
            <div className="flex flex-col justify-end gap-3 w-full">
              <button
                className="bg-black flex flex-col justify-center h-12 shrink-0 items-center rounded-[41px] text-center text-sm font-SF_Pro_Rounded font-semibold leading-[20px] text-white"
                onClick={sendUserOp}
              >
                Mint Igloo NFT
              </button>
              <div className="text-center text-xs font-SF_Pro_Rounded tracking-[-0.24] leading-[20px]">
                Try out your new smart wallet by minting this NFT. <br />
                We will cover the gas for this!
              </div>
            </div>
          </>
        );
      case LoginViews.SIGN_UP:
        return (
          <SignInView
            signIn={authThenGetSessionSigs}
            createNewPasskey={createPKPWithWebAuthn}
          />
        );
      default:
        return (
          <InitialView
            creatNewPasskey={() => dispatch(setView(LoginViews.SIGN_UP))}
            useExistingPasskey={authThenGetSessionSigs}
          />
        );
    }
  };

  return (
    <>
      <div className="flex flex-col gap-1 w-full py-6 px-6 h-screen justify-between lg:max-w-md mx-auto">
        {renderView()}
      </div>
    </>
  );
}
