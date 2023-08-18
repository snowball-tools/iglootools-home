import React from "react";
import { LoginViews } from "@/store/credentialsSlice";
import { SessionSigsMap } from "@lit-protocol/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { SendUserOperationResult, chains } from "@alchemy/aa-core";

export interface InfoViewConstants {
  titleText: string;
  subtitleText: string;
  img: string | null;
}

function infoForLoginView(
  loginView: string,
  sessionSigs: SessionSigsMap | null,
  userOpResult: SendUserOperationResult | null,
  errorMsg: string | null
): InfoViewConstants {
  switch (loginView) {
    case LoginViews.REGISTERING:
      return {
        titleText: "Registering your passkey...",
        subtitleText: "Follow your browser's prompts to create a passkey.",
        img: "https://file.rendit.io/n/Y7s8UgkX9ncEJGAHPyXo.svg",
      };
    case LoginViews.AUTHENTICATING:
      return {
        titleText: "Authenticate with your passkey",
        subtitleText:
          " To start using your new cloud wallet, you'll need to authenticate with your newly registered passkey. Follow your browser's prompts to authenticate.",
        img: null,
      };
    case LoginViews.MINTING:
      return {
        titleText: `Minting your ${sessionSigs ? "Igloo NFT" : "Wallet"}...`,
        subtitleText: `Stay with us on this page as your ${
          sessionSigs ? "Igloo NFT" : "cloud wallet"
        } is being minted on-chain.`,
        img: sessionSigs
          ? null
          : "https://file.rendit.io/n/uK7Vgn7ggxm17IS9sIKy.svg",
      };
    case LoginViews.MINTED:
      return {
        titleText: "Wallet created",
        subtitleText:
          "Creating a secured session so you can use your new cloud wallet.",
        img: "https://file.rendit.io/n/77wvPNvaNWwIdbQtfqHz.svg",
      };
    case LoginViews.IGLOO_NFT_MINTED:
      return {
        titleText: "Igloo NFT Minted",
        subtitleText: userOpResult?.hash ?? "",
        img: null,
      };
    case LoginViews.WALLET_HOME:
      return {
        titleText: "Wallet Home",
        subtitleText: "",
        img: null,
      };
    case LoginViews.ERROR:
      return {
        titleText: "Error",
        subtitleText: errorMsg ?? "",
        img: null,
      };
    default:
      return {
        titleText: "Welcome to Igloo!",
        subtitleText: "Please sign in to continue",
        img: null,
      };
  }
}

interface InfoViewProps {
  infoView: string;
  sendUserOp?: () => void;
}

const InfoView = ({ infoView, sendUserOp }: InfoViewProps) => {
  const { sessionSigs, userOpResult, errorMsg, currentAppChain } = useSelector(
    (state: RootState) => state.credentials
  );
  const { titleText, subtitleText, img } = infoForLoginView(
    infoView,
    sessionSigs,
    userOpResult,
    errorMsg
  );

  return (
    <>
      <div className="flex flex-col gap-10 items-center">
        {img && <img src={img} />}
        <div className="self-stretch flex flex-col gap-1 items-start">
          <div className="text-xl font-SF_Pro_Rounded font-bold tracking-[0.35] leading-[28px]">
            {titleText}
          </div>
          <div className="text-sm font-SF_Pro_Rounded tracking-[-0.24] leading-[20px]">
            {infoView === LoginViews.IGLOO_NFT_MINTED ? (
              <a
                href={`https://www.jiffyscan.xyz/userOpHash/${subtitleText}?network=${currentAppChain.name}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 break-all"
              >
                {subtitleText}
              </a>
            ) : (
              subtitleText
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoView;
