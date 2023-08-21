import React from "react";
import StatusBar from "@/components/StatusBar";
import StickyButtonGroup from "@/components/StickyButtonGroup";
import Header from "@/components/Header";
import { IglooViews } from "@/store/credentialsSlice";

interface SignUpViewProps {
  signIn: () => void;
  createNewPasskey: () => void;
  username: string;
  setUsername: (username: string) => void;
}

const SignUpView = ({
  signIn,
  createNewPasskey,
  username,
  setUsername,
}: SignUpViewProps) => {
  // todo: fix. why compiler
  if (username === undefined) {
    return <></>;
  }
  return (
    <>
      <div className="flex flex-col gap-10 items-center">
        <div className="self-stretch flex flex-col gap-6 items-start">
          <Header infoView={IglooViews.SIGN_UP} />

          <input
            type="text"
            placeholder="ex. Taylor Swift"
            className="w-full h-12 pl-5 pr-5 rounded-lg border-2 border-[#29353] focus:border-[#9EE7FF] bg-white text-sm font-sf_pro_text tracking-wide leading-5 text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </div>
      <StickyButtonGroup
        buttons={[
          {
            disabled: username.length === 0,
            label: "Create passkey",
            onClick: createNewPasskey,
            bgColor: "bg-cyan-200",
            textColor: "text-black",
          },
          {
            label: "Sign in",
            onClick: signIn,
            bgColor: "bg-clear",
            textColor: "text-white",
            textWeight: "font-normal",
          },
        ]}
      />
    </>
  );
};

export default SignUpView;
