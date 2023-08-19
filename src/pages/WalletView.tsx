import React from "react";
import NavBar from "@/components/NavBar";

export default function WalletView() {
  return (
    <div className="flex flex-col gap-1 w-full py-6 px-6 h-screen justify-between lg:max-w-md mx-auto">
      <div className="border-solid overflow-hidden bg-[#131313] flex flex-col gap-2 w-full h-[852px] px-5 py-4 border-black border">
        <NavBar />
        <div className="border-solid border-white/10 h-px shrink-0 mb-3 ml-px border-t border-b-0 border-x-0" />
        <div className="text-2xl font-['SF_Pro_Display'] font-bold tracking-[0.35] leading-[26px] text-white self-start ml-px">
          Welcome to your smart wallet
        </div>
        <div
          className="font-sf_pro_text tracking-[-0.24] leading-[20px] text-white/60 self-center mb-3 w-full"
          id="ThisIsASubheading"
        >
          No more passwords, no more seed phrases, no more extensions. We're
          talking ERC-4337, baby.
        </div>
        <div className="bg-[#9ee7ff] flex flex-col justify-center gap-3 mx-px pt-2 pb-4 px-5 rounded-lg">
          <div className="flex flex-col gap-1 items-start">
            <div
              className="text-xl font-['SF_Pro_Display'] font-bold leading-[40px]"
              id="ChloesSpecialPasskey"
            >
              Chloe's special passkey
            </div>
            <div className="text-sm font-['SF_Mono'] font-medium leading-[20px] w-full break-all">
              0xdb6386EF2bC4A559c71e84038156612d3aF9B07c
            </div>
          </div>
          <div className="flex flex-row mr-1 gap-2 items-start">
            <button
              className="bg-[#00d4ff] flex flex-col w-1/2 h-8 items-center py-1 rounded-[41px]"
              id="Button2"
            >
              <div
                className="text-xs font-['SF_Pro_Text'] font-semibold tracking-[-0.41] leading-[24px]"
                id="Label1"
              >
                Copy address
              </div>
            </button>
            <button
              className="bg-[#00d4ff] flex flex-col w-1/2 h-8 items-center py-1 rounded-[41px]"
              id="Button3"
            >
              <div
                className="text-xs font-['SF_Pro_Text'] font-semibold tracking-[-0.41] leading-[24px]"
                id="Label2"
              >
                View on Etherscan
              </div>
            </button>
          </div>
        </div>
        <div className="border-solid border-white/32 flex flex-col gap-1 h-40 shrink-0 items-center mx-px pl-5 py-5 border rounded-lg">
          <div
            className="font-['SF_Pro_Text'] font-bold tracking-[-0.41] leading-[24px] text-white self-start"
            id="ThisIsAHeading1"
          >
            What is a ERC-4337 wallet?
          </div>
          <div
            className="font-['SF_Pro_Text'] tracking-[-0.41] leading-[24px] text-white w-full"
            id="ThisIsASubheading1"
          >
            Smart contract wallets using Account Abstraction (ERC-4337) are
            managed by a smart contract instead of just one private key like
            regular wallets.
          </div>
        </div>
        <div className="border-solid border-white/30 flex flex-row justify-center pb-4 gap-1 h-[115px] shrink-0 items-center mx-px border rounded-lg">
          <div className="flex flex-col gap-1 w-3/5 items-start">
            <div
              className="font-['SF_Pro_Text'] font-bold tracking-[-0.41] leading-[24px] text-white"
              id="ThisIsAHeading2"
            >
              Take your smart wallet for a spin
            </div>
            <div className="font-['SF_Pro_Text'] tracking-[-0.41] leading-[24px] text-white">
              Mint a free Igloo NFT. <br />
              We'll cover the gas.
            </div>
          </div>
          <button className="bg-[#9ee7ff] self-end flex flex-col mb-1 w-20 shrink-0 h-10 items-center py-2 rounded-[41px]">
            <div className="text-xs font-['SF_Pro_Text'] font-semibold tracking-[-0.41] leading-[24px]">
              Mint NFT
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
