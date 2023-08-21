import React from "react";
import { IglooViews } from "@/store/credentialsSlice";
import StatusBar from "@/components/StatusBar";

export interface HeaderConstants {
  titleText: string;
  subtitleText: string;
  step: number;
  additionalText?: string;
}

function getHeaderConstants(
  loginView: string,
  mintingNFT: boolean = false,
  errorMsg?: string
): HeaderConstants {
  switch (loginView) {
    case IglooViews.UNSUPPORTED_BROWSER:
      return {
        titleText: "Browser not supported",
        subtitleText:
          "Unfortunately, your browser does not support platform authenticators. Try visiting this demo on Chrome, Safari, Brave, or Edge. Refer to this table for a more comprehensive list of supported browsers and operating systems.",
        step: 0,
      };
    case IglooViews.REGISTERING:
      return {
        titleText: "Registering your passkey...",
        subtitleText: "Follow your browser's prompts to create a passkey.",
        step: 2,
      };
    case IglooViews.AUTHENTICATING:
      return {
        titleText: "Authenticate with your passkey",
        subtitleText:
          "To start using your new cloud wallet, you'll need to authenticate with your newly registered passkey. Follow your browser's prompts to authenticate.",
        step: 0,
      };
    case IglooViews.IGLOO_NFT_MINTING:
    case IglooViews.MINTING:
      return {
        titleText: `Minting your ${mintingNFT ? "Igloo NFT" : "Wallet"}...`,
        subtitleText: `Stay with us on this page as your ${
          mintingNFT ? "Igloo NFT" : "cloud wallet"
        } is being minted on-chain.`,
        step: mintingNFT ? 0 : 3,
      };
    case IglooViews.MINTED:
      return {
        titleText: "Wallet created",
        subtitleText:
          "Creating a secured session so you can use your new cloud wallet.",
        step: 4,
      };
    case IglooViews.IGLOO_NFT_MINTED:
      return {
        titleText: "Minting successful",
        subtitleText: "Added to your smart wallet",
        step: 0,
        additionalText: "🎉",
      };
    case IglooViews.WALLET_HOME:
      return {
        titleText: "Wallet Home",
        subtitleText: "",
        step: 0,
      };
    case IglooViews.ERROR:
      return {
        titleText: "Error",
        subtitleText: errorMsg ?? "",
        step: 0,
      };
    case IglooViews.SIGN_UP:
      return {
        titleText: "Name your passkey",
        subtitleText: "Give your passkey a unique name.",
        step: 1,
      };
    default:
      return {
        titleText: "Welcome to Igloo!",
        subtitleText: "Please sign in to continue",
        step: 0,
      };
  }
}

interface InfoViewProps {
  infoView: string;
  mintingNFT?: boolean;
  errorMsg?: string;
}

const Header = ({ infoView, mintingNFT, errorMsg }: InfoViewProps) => {
  const { titleText, subtitleText, step, additionalText } = getHeaderConstants(
    infoView,
    mintingNFT,
    errorMsg
  );

  return (
    <>
      <div className="flex flex-col gap-6 items-center w-full">
        <StatusBar step={step} />
        <div className="self-stretch flex flex-col gap-2 items-start w-full">
          <div className="self-stretch text-white text-2xl font-bold tracking-[0.35] leading-[28px] font-sf_pro_display">
            {titleText}&nbsp;&nbsp;{additionalText && additionalText}
          </div>
          <div className="self-stretch text-white text-opacity-60 text-base font-normal leading-tight font-sf_pro_text">
            {subtitleText}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
