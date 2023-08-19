import React from "react";
import { Chain } from "@/helpers/chains";
import InfoView from "./InfoView";
import { LoginViews } from "@/store/credentialsSlice";

interface MintedIglooNFTProps {
  chain: Chain;
  openInOpenSeaAction: () => void;
  returnToWalletAction: () => void;
}

const MintedIglooNFT = ({
  chain,
  openInOpenSeaAction,
  returnToWalletAction,
}: MintedIglooNFTProps) => {
  return (
    <>
      <div className="flex flex-col gap-1 w-full py-6 px-6 h-screen justify-between lg:max-w-md mx-auto">
        <InfoView infoView={LoginViews.IGLOO_NFT_MINTED} />
        <div className="w-44 h-64 relative">
          <div className="w-44 h-44 left-0 top-0 absolute">
            <div className="w-44 h-44 left-0 top-0 absolute bg-blue-500 rounded-lg" />
            <div className="w-28 h-20 left-[34px] top-[49.25px] absolute">
              <div className="opacity-10 w-20 h-20 left-0 top-0 absolute"></div>
              <div className="opacity-20 w-20 h-20 left-[8.63px] top-0 absolute"></div>
              <div className="opacity-50 w-20 h-20 left-[20.31px] top-0 absolute"></div>
            </div>
          </div>
          <div className="left-[36px] top-[193px] absolute text-white text-xl font-normal leading-10">
            Igloo #172
          </div>
          <div className="left-[26px] top-[233px] absolute text-white text-opacity-60 text-base font-normal leading-tight">
            Minted on {chain.name}
          </div>
        </div>
        <div className="flex flex-col gap-3 items-center mx-1">
          <button
            className="bg-cyan-200 self-stretch flex flex-col justify-center h-12 shrink-0 items-center rounded-[41px] text-center text-sm font-sf_pro_rounded font-semibold leading-[20px] text-black disabled:bg-disabled-gray disabled:text-white/10"
            onClick={openInOpenSeaAction}
          >
            View on OpenSea
          </button>
          <button
            className="flex flex-col w-1/2 h-8 shrink-0 items-center py-2 rounded-lg text-center text-sm font-sf_pro_rounded font-semibold leading-[20px]"
            onClick={returnToWalletAction}
          >
            Return to Wallet
          </button>
        </div>
      </div>
    </>
  );
};

export default MintedIglooNFT;
