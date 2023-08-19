import React, { PropsWithChildren } from "react";

interface BoxProps extends PropsWithChildren {}

const Box = ({ children }: BoxProps) => (
  <div className="flex flex-col gap-1 w-full py-6 px-6 h-screen justify-between lg:max-w-md mx-auto">
    {children}
  </div>
);

export default Box;
