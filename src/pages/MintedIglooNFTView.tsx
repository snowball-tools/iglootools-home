import React from "react";
import { Chain } from "@/helpers/chains";
import Header from "../components/Header";
import { LoginViews } from "@/store/credentialsSlice";
import StickyButtonGroup from "@/components/StickyButtonGroup";

interface MintedIglooNFTProps {
  nftLabel: string;
  chain: Chain;
  openInOpenSeaAction: () => void;
  returnToWalletAction: () => void;
}

const MintedIglooNFT = ({
  nftLabel,
  chain,
  openInOpenSeaAction,
  returnToWalletAction,
}: MintedIglooNFTProps) => {
  return (
    <>
      <Header infoView={LoginViews.IGLOO_NFT_MINTED} />
      <div className="flex flex-col justify-between gap-2 w-full items-start">
        <img
          src="https://file.rendit.io/n/HUQNaYa4fQwtw3yDCZwC.svg"
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
            onClick: openInOpenSeaAction,
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

export default MintedIglooNFT;
