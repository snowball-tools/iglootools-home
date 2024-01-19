"use client";

import React from "react";
import Header from "@/components/Header";
import { AuthViews } from "@/store/credentialsSlice";
import StickyButtonGroup from "@/components/StickyButtonGroup";
import { Chain } from "@/helpers/chains";
import Image from "next/image";

interface MintedIglooNFTProps {
  nftLabel: string;
  chain: Chain;
  primaryActionAfterMint: () => void;
  returnToWalletAction: () => void;
}

const MintedIglooNFTView = ({
  nftLabel,
  chain,
  primaryActionAfterMint,
  returnToWalletAction,
}: MintedIglooNFTProps) => {
  // todo: fix. why compiler
  if (chain === undefined) {
    return <></>;
  }
  return (
    <>
      <Header infoView={AuthViews.IGLOO_NFT_MINTED} />
      <div className="flex flex-col justify-between gap-2 w-full items-start">
        <Image
          src="snowball.svg"
          alt="igloo"
          width={200}
          height={200}
          className="self-center"
        />
        <div className="text-center text-xl font-orelega_one leading-[40px] text-white w-full">
          {nftLabel}
        </div>
        <div className="text-center font-sf_pro_text tracking-[-0.24] leading-[20px] text-white/60 w-full">
          Minted on {chain.name}
        </div>
      </div>

      <StickyButtonGroup
        buttons={[
          {
            label: "View on OpenSea",
            onClick: primaryActionAfterMint,
            bgColor: "bg-cyan-200",
            textColor: "text-black",
            disabledColor: "disabled:bg-disabled-gray disabled:text-white/10",
          },
          {
            label: "Return to Wallet",
            onClick: returnToWalletAction,
            bgColor: "bg-clear",
            textColor: "text-white",
            textWeight: "font-normal",
          },
        ]}
      />
    </>
  );
};

export default MintedIglooNFTView;
