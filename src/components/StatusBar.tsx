import React from "react";

interface StatusBarProps {
  step: number;
}

const StatusBar = ({ step }: StatusBarProps) => (
  <>
    {step === 0 ? (
      <></>
    ) : (
      <svg
        width="247"
        height="4"
        viewBox="0 0 247 4"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.5" width="54" height="4" rx="2" fill="#9EE7FF" />
        <rect
          x="64.5"
          width="54"
          height="4"
          rx="2"
          fill={step > 1 ? "#9EE7FF" : "white"}
          fill-opacity="0.2"
        />
        <rect
          x="128.5"
          width="54"
          height="4"
          rx="2"
          fill={step > 2 ? "#9EE7FF" : "white"}
          fill-opacity="0.2"
        />
        <rect
          x="192.5"
          width="54"
          height="4"
          rx="2"
          fill={step > 3 ? "#9EE7FF" : "white"}
          fill-opacity="0.2"
        />
      </svg>
    )}
  </>
);

export default StatusBar;
