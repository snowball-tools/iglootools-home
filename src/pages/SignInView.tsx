import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsername } from "../store/credentialsSlice";
import { RootState } from "../store/store";

interface SignInViewProps {
  signIn: () => void;
  createNewPasskey: () => void;
}

const SignInView = ({ signIn, createNewPasskey }: SignInViewProps) => {
  const { username } = useSelector((state: RootState) => state.credentials);
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex flex-col gap-10 items-center">
        <img
          src="https://file.rendit.io/n/OhrRTNJD88Xqy50mt6vV.svg"
          alt="step one in progress bar"
        />
        <div className="self-stretch flex flex-col gap-2 items-start">
          <div className="flex flex-col ml-1 gap-1 w-3/5 items-start">
            <div className="text-xl font-SF_Pro_Rounded font-bold tracking-[0.35] leading-[28px]">
              Name your passkey
            </div>
            <div className="text-sm font-SF_Pro_Rounded tracking-[-0.24] leading-[20px]">
              Give your passkey a unique name.
            </div>
          </div>
          <input
            type="text"
            placeholder="ex. Taylor Swift"
            className="w-[342px] h-12 pl-5 pr-5 rounded-lg border-2 border-[rgba(182,236,226,0.16)] focus:border-[#b6ece2] bg-white text-sm font-sans tracking-wide leading-5"
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 items-center mx-1">
        <button
          className="bg-black self-stretch flex flex-col justify-center h-12 shrink-0 items-center rounded-[41px] text-center text-sm font-SF_Pro_Rounded font-semibold leading-[20px] text-white disabled:bg-disabled-gray"
          disabled={username.length === 0}
          onClick={createNewPasskey}
        >
          Create passkey
        </button>
        <button
          className="flex flex-col w-1/2 h-8 shrink-0 items-center py-2 rounded-lg text-center text-sm font-SF_Pro_Rounded font-semibold leading-[20px]"
          onClick={signIn}
        >
          Sign in with passkey
        </button>
      </div>
    </>
  );
};

export default SignInView;
