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
    <div className="self-stretch font-orelega_one text-white text-5xl font-normal leading-10">
      igloo
    </div>
    <div className="flex-col justify-center items-start gap-7 inline-flex">
      <div className="self-stretch text-white text-2xl font-bold leading-7 tracking-tight font-sf_pro_display">
        The most secure and customizable wallet that's 100% yours
      </div>
      <div className="self-stretch text-white text-opacity-60 text-base font-normal leading-tight font-sf_pro_text">
        Create a self-custody wallet in just a few taps using the latest auth
        flow—passkeys. <br />
        <br />
        No more passwords, no more seed phrases, no more extensions.
      </div>
    </div>
    <div className="flex flex-col gap-3 w-full">
      <button
        className="bg-[#9ee7ff] flex flex-col justify-center mb-2 h-12 shrink-0 items-center rounded-[41px] text-center text-md font-semibold font-sf_pro_text leading-tight text-black"
        onClick={creatNewPasskey}
      >
        Create a new passkey
      </button>
      <button
        className="bg-[#282828] border-solid flex flex-col justify-center h-12 shrink-0 items-center rounded-[41px] text-center text-md font-semibold font-sf_pro_text leading-tight"
        onClick={useExistingPasskey}
      >
        Sign in
      </button>
    </div>
  </>
);

export default InitialView;
