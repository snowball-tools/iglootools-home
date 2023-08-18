import React from "react";

interface InitialViewProps {
  creatNewPasskey: () => void;
  useExistingPasskey: () => void;
}

const InitialView = ({
  creatNewPasskey,
  useExistingPasskey,
}: InitialViewProps) => (
  <>
    <div className="flex flex-col items-center justify-center gap-1 w-full pb-3 px-6">
      <div className="text-center text-4xl font-['SF_Pro_Rounded'] font-bold tracking-[-1.13] leading-[40px] mb-16">
        Igloo
      </div>
      <div className="text-center text-xl font-['SF_Pro_Rounded'] font-bold tracking-[0.35] leading-[28px] mb-2 w-full">
        The most secure and customizable wallet that is 100% yours
      </div>
      <div className="text-center font-['SF_Pro_Text'] tracking-[-0.41] leading-[24px] mb-16 w-3/4">
        Create a self-custody wallet in just a few taps using the latest auth
        flow—passkeys. <br />
        <br />
        No more passwords, no more seed phrases, no more extensions.
      </div>
    </div>
    <div className="flex flex-col gap-1 w-full">
      <button
        className="bg-black flex flex-col justify-center mb-2 h-12 shrink-0 items-center rounded-[41px]"
        onClick={creatNewPasskey}
      >
        <div className="text-center text-sm font-['SF_Pro_Rounded'] font-semibold leading-[20px] text-white">
          Create a new passkey
        </div>
      </button>
      <button
        className="border-solid flex flex-col justify-center h-12 shrink-0 items-center border-black border rounded-[41px]"
        onClick={useExistingPasskey}
      >
        <div className="text-center text-sm font-['SF_Pro_Rounded'] font-semibold leading-[20px]">
          I already have a wallet
        </div>
      </button>
    </div>
  </>
);

export default InitialView;
