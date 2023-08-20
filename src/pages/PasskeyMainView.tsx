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
  disconnect,
  setUsername,
  switchChain,
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
import InitialView from "./InitialView";
import SignUpView from "./SignUpView";
import Header from "../components/Header";
import { AuthMethod } from "@lit-protocol/types";
import WalletView from "./WalletView";
import Box from "@/components/Box";
import StickyButtonGroup from "@/components/StickyButtonGroup";
import { Chain } from "@/helpers/chains";
import MintedIglooNFTView from "./MintedIglooNFTView";
import LoadingAnimation from "@/components/LoadingAnimation";
import { updateWebhookAddressesForChain } from "./api/iglooNFTWebhook";

export default function PasskeyMainView() {
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

      dispatch(setView(LoginViews.MINTING));

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

  async function sendUserOp() {
    dispatch(setView(LoginViews.IGLOO_NFT_MINTING));

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

        await updateWebhookAddressesForChain(currentAppChain, [result.hash]);

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
      case LoginViews.IGLOO_NFT_MINTING:
      case LoginViews.MINTING:
        return (
          <>
            <Header
              infoView={view}
              mintingNFT={view === LoginViews.IGLOO_NFT_MINTING}
            />
            <LoadingAnimation />
          </>
        );
      case LoginViews.MINTED:
        return <Header infoView={view} />;
      case LoginViews.IGLOO_NFT_MINTED:
        return (
          <MintedIglooNFTView
            nftLabel={"IglooNFT #172"}
            chain={currentAppChain}
            openInOpenSeaAction={() =>
              // to do open sea link
              window.open(
                `${currentAppChain.blockExplorerUrls[0]}/address/${ethAddress}`,
                "_blank"
              )
            }
            returnToWalletAction={() =>
              dispatch(setView(LoginViews.WALLET_HOME))
            }
          />
        );
      case LoginViews.ERROR:
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
      case LoginViews.WALLET_HOME:
        return (
          <WalletView
            mintNftAction={sendUserOp}
            exitAction={() => dispatch(disconnect())}
            ethAddress={ethAddress ?? ""}
            openInBlockExplorerAction={() =>
              window.open(
                `${currentAppChain.blockExplorerUrls[0]}/address/${ethAddress}`,
                "_blank"
              )
            }
            copyAddressAction={() =>
              navigator.clipboard.writeText(ethAddress ?? "")
            }
            chain={currentAppChain}
            supportedChains={appChains}
            switchChainAction={(newChain: Chain) => {
              dispatch(switchChain(newChain));
            }}
          />
        );
      case LoginViews.SIGN_UP:
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
            creatNewPasskey={() => dispatch(setView(LoginViews.SIGN_UP))}
            useExistingPasskey={authThenGetSessionSigs}
          />
        );
    }
  };

  return <Box>{renderView()}</Box>;
}
