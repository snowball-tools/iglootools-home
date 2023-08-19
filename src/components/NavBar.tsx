import React from "react";
import DropdownMenu from "./DropDownMenu";
import Image from "next/image";
import { Chain } from "@/helpers/chains";
import { current } from "@reduxjs/toolkit";

interface NavBarProps {
  currentChain: Chain;
  supportedChains: { [key: string]: Chain };
  switchChainAction: (chain: Chain) => void;
  exitAction: () => void;
}

const NavBar = ({
  currentChain,
  supportedChains,
  switchChainAction,
  exitAction,
}: NavBarProps) => (
  <div className="flex">
    <DropdownMenu
      currentChain={currentChain}
      supportedChains={supportedChains}
      switchChainAction={switchChainAction}
    />
    <Image
      src="rectangle_portrait_and_arrow_right.svg"
      alt="exit button"
      className="h-5 w-5"
      width={20}
      height={20}
      onClick={exitAction}
    />
  </div>
);

export default NavBar;
