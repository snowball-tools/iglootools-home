import React from "react";
import NavBar from "@/components/NavBar";
import ColumnButton from "@/components/ColumnButton";
import Card from "@/components/Card";
import { Chain } from "@/helpers/chains";

export interface WalletViewProps {
  chain: Chain;
  supportedChains: { [key: string]: Chain };
  switchChainAction: (chain: Chain) => void;
  ethAddress: string;
  mintNftAction: () => void;
  exitAction: () => void;
  openInBlockExplorerAction: () => void;
  copyAddressAction: () => void;
}

const WalletView = ({
  chain,
  supportedChains,
  switchChainAction,
  ethAddress,
  mintNftAction,
  exitAction,
  openInBlockExplorerAction,
  copyAddressAction,
}: WalletViewProps) => {
  // todo: fix. why compiler
  if (chain === undefined) {
    return <></>;
  }
  return (
    <div className="flex flex-col gap-2">
      <NavBar
        exitAction={exitAction}
        currentChain={chain}
        supportedChains={supportedChains}
        switchChainAction={switchChainAction}
      />
      <div className="border-solid border-white/10 h-px shrink-0 mb-3 ml-px border-t border-b-0 border-x-0" />
      <div className="text-2xl font-sf_pro_display font-bold tracking-[0.35] leading-[26px] text-white self-start ml-px">
        Welcome to your smart wallet
      </div>
      <div className="font-sf_pro_text tracking-[-0.24] leading-[20px] text-white/60 self-center mb-3 w-full">
        No more passwords, no more seed phrases, no more extensions. We&apos;re
        talking ERC-4337, baby.
      </div>
      <Card color="bg-[#9ee7ff]" textColor="text-black" borderColor={undefined}>
        <div className="flex flex-col gap-1 items-start">
          <div className="text-xl font-sf_pro_display font-bold leading-[40px] text-black">
            Your Smart Wallet
          </div>
          <div className="text-sm font-sf_mono font-medium leading-[20px] w-full break-all text-black">
            {ethAddress}
          </div>
        </div>
        <div className="flex flex-row mr-1 gap-2 items-start">
          <ColumnButton
            text="Copy address"
            color="bg-[#00d4ff]"
            textColor="text-black"
            onClick={copyAddressAction}
          />
          <ColumnButton
            text="View on Etherscan"
            color="bg-[#00d4ff]"
            textColor="text-black"
            onClick={openInBlockExplorerAction}
          />
        </div>
      </Card>
      <Card
        color="bg-clear"
        textColor="text-white"
        borderColor="border border-white/32 border-solid"
      >
        <div className="font-sf_pro_text font-bold tracking-[-0.41] leading-[24px] text-white self-start">
          What is a ERC-4337 wallet?
        </div>
        <div className="font-sf_pro_text tracking-[-0.41] leading-[24px] text-white w-full">
          Smart contract wallets using Account Abstraction (ERC-4337) are
          managed by a smart contract ....
        </div>
      </Card>
      <Card
        color="bg-clear"
        textColor="text-white"
        borderColor="border border-white/30 border-solid"
      >
        <div className="flex-col justify-start items-start gap-1 inline-flex">
          <div className="self-stretch text-white text-baseleading-normal font-sf_pro_text font-bold">
            Take your smart wallet for a spin
          </div>
          <div className="self-stretch grow shrink basis-0 justify-start items-center gap-3 inline-flex">
            <div className="font-sf_pro_text grow shrink basis-0 text-white text-base font-normal leading-normal">
              Mint a free Igloo NFT. We&apos;ll cover the gas.
            </div>
            <button
              className="px-4 py-2 bg-cyan-200 rounded-3xl justify-center items-center gap-1 flex"
              onClick={mintNftAction}
            >
              <div className="text-black text-xs font-semibold leading-normal font-sf_pro_text">
                Mint NFT
              </div>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletView;
