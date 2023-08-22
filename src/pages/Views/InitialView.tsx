import React from "react";
import StickyButtonGroup from "@/components/StickyButtonGroup";
import Image from "next/image";

interface InitialViewProps {
  creatNewPasskey: () => void;
  useExistingPasskey: () => void;
}

const InitialView = ({
  creatNewPasskey,
  useExistingPasskey,
}: InitialViewProps) => (
  <>
    <div className="flex flex-row justify-between w-full items-start">
      <div className="self-stretch font-orelega_one text-white text-5xl font-normal leading-10">
        igloo
      </div>
      <a href="https://twitter.com/snowballtools">
        <Image
          width={0}
          height={0}
          style={{ width: "auto", height: 17 }}
          className="pt-1"
          src="twitter-logo.svg"
          alt="alchemy logo"
        />
      </a>
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
      <div className="flex flex-col relative gap-2">
        <div className="text-white text-opacity-60 text-xs font-normal leading-tight font-sf_pro_text">
          In partnership with
        </div>
        <div className="justify-center items-center gap-2 inline-flex">
          <a href="https://www.alchemy.com">
            <Image
              width={0}
              height={0}
              style={{ width: "auto", height: 19 }}
              src="alchemy-logo.svg"
              alt="alchemy logo"
            />
          </a>
          <a href="https://litprotocol.com">
            <Image
              width={0}
              height={0}
              style={{ width: "auto", height: 14, marginBottom: 2 }}
              src="lit-logo.svg"
              alt="lit protocol logo"
            />
          </a>
        </div>
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
