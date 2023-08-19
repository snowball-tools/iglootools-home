import StickyButtonGroup from "@/components/StickyButtonGroup";
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
        The most secure and customizable wallet that&apos;s 100% yours
      </div>
      <div className="self-stretch text-white text-opacity-60 text-base font-normal leading-tight font-sf_pro_text">
        Create a self-custody wallet in just a few taps using the latest auth
        flow—passkeys. <br />
        <br />
        No more passwords, no more seed phrases, no more extensions.
      </div>
    </div>

    <StickyButtonGroup
      buttons={[
        {
          label: "Create a new passkey",
          onClick: creatNewPasskey,
          bgColor: "bg-[#9ee7ff]",
          textColor: "text-black",
          textSize: "text-md",
        },
        {
          label: "Sign in",
          onClick: useExistingPasskey,
          bgColor: "bg-[#282828]",
          textColor: "text-white",
          textSize: "text-md",
        },
      ]}
    />
  </>
);

export default InitialView;
