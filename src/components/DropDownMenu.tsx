import React, { useState } from "react";
import { Chain } from "../helpers/chains";
import ChainMenuItem from "./ChainMenuItem";

interface DropDownMenuProps {
  currentChain: Chain;
  supportedChains: { [key: string]: Chain };
  switchChainAction: (chain: Chain) => void;
}

const DropDownMenu = ({
  currentChain,
  supportedChains,
  switchChainAction,
}: DropDownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  async function selectChain(chain: Chain) {
    switchChainAction(chain);
    setIsOpen(false);
  }

  return (
    <div className="flex flex-grow justify-start">
      <div className="relative inline-block text-left">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {ChainMenuItem({ chain: currentChain })}
        </button>
        {isOpen && (
          <div className="origin-top-left absolute left-0 mt-2 rounded-md shadow-lg bg-white">
            <div className="py-1">
              {Object.values(supportedChains).map((chain: Chain) => {
                return (
                  <button
                    key={chain.name}
                    onClick={() => selectChain(chain)}
                    className="block w-full pl-2 pr-8 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left disabled:opacity-40"
                    disabled={
                      chain.name === currentChain.name || !chain.enabled
                    }
                  >
                    {ChainMenuItem({ chain })}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDownMenu;
