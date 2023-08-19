import React from "react";
import { LoginViews } from "@/store/credentialsSlice";
import StatusBar from "@/components/StatusBar";

export interface HeaderConstants {
  titleText: string;
  subtitleText: string;
  step: number;
}

function getHeaderConstants(
  loginView: string,
  mintingNFT: boolean = false,
  errorMsg?: string
): HeaderConstants {
  switch (loginView) {
    case LoginViews.REGISTERING:
      return {
        titleText: "Registering your passkey...",
        subtitleText: "Follow your browser's prompts to create a passkey.",
        step: 2,
      };
    case LoginViews.AUTHENTICATING:
      return {
        titleText: "Authenticate with your passkey",
        subtitleText:
          " To start using your new cloud wallet, you'll need to authenticate with your newly registered passkey. Follow your browser's prompts to authenticate.",
        step: 0,
      };
    case LoginViews.MINTING:
      return {
        titleText: `Minting your ${mintingNFT ? "Igloo NFT" : "Wallet"}...`,
        subtitleText: `Stay with us on this page as your ${
          mintingNFT ? "Igloo NFT" : "cloud wallet"
        } is being minted on-chain.`,
        step: mintingNFT ? 0 : 3,
      };
    case LoginViews.MINTED:
      return {
        titleText: "Wallet created",
        subtitleText:
          "Creating a secured session so you can use your new cloud wallet.",
        step: 4,
      };
    case LoginViews.IGLOO_NFT_MINTED:
      return {
        titleText: "Minting succesful  🎉",
        subtitleText: "Added to your smart wallet",
        step: 0,
      };
    case LoginViews.WALLET_HOME:
      return {
        titleText: "Wallet Home",
        subtitleText: "",
        step: 0,
      };
    case LoginViews.ERROR:
      return {
        titleText: "Error",
        subtitleText: errorMsg ?? "",
        step: 0,
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
  const { titleText, subtitleText, step } = getHeaderConstants(
    infoView,
    mintingNFT,
    errorMsg
  );

  return (
    <>
      <div className="flex flex-col gap-10 items-center">
        <StatusBar step={step} />
        <div className="self-stretch flex flex-col gap-1 items-start">
          <div className="text-xl font-sf_pro_rounded font-bold tracking-[0.35] leading-[28px]">
            {titleText}
          </div>
          <div className="text-sm font-sf_pro_rounded tracking-[-0.24] leading-[20px]">
            {subtitleText}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
