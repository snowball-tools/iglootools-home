import React from "react";

interface StatusBarProps {
  step: number;
}

const StatusBar = ({ step }: StatusBarProps) => (
  <>
    {step === 0 ? (
      <></>
    ) : (
      <div className="w-60 h-1 relative">
        <div className="w-60 h-1 left-0 top-0 absolute">
          <div
            className={`w-14 h-1 left-0 top-0 absolute rounded-xl bg-cyan-200`}
          />
          <div
            className={`w-14 h-1 left-[64px] top-0 absolute rounded-xl ${
              step >= 2 ? "bg-cyan-200" : "bg-white bg-opacity-20"
            }`}
          />
          <div
            className={`w-14 h-1 left-[128px] top-0 absolute rounded-xl ${
              step >= 3 ? "bg-cyan-200" : "bg-white bg-opacity-20"
            }`}
          />
          <div
            className={`w-14 h-1 left-[192px] top-0 absolute rounded-xl ${
              step >= 4 ? "bg-cyan-200" : "bg-white bg-opacity-20"
            }`}
          />
        </div>
      </div>
    )}
  </>
);

export default StatusBar;
