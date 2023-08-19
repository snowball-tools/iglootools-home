import React from "react";
import { Chain, getChainIcon } from "../helpers/chains";
import Image from "next/image";

interface ChainMenuItemProps {
  chain: Chain;
}

const ChainMenuItem = ({ chain }: ChainMenuItemProps) => (
  <div className="flex items-center">
    <Image
      src={getChainIcon(chain)}
      alt={`${chain.name} logo`}
      className="h-5 w-5"
      width={20}
      height={20}
    />
    <span className="ml-2 font-sf_pro_text font-semibold">{chain.name}</span>
  </div>
);

export default ChainMenuItem;
