import React, { useState } from "react";
import { Chain } from "@/helpers/chains";
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
          className="text-white focus:outline-none flex items-center"
        >
          <ChainMenuItem
            chain={currentChain}
            testnet={currentChain.testNetwork}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="origin-top-left absolute left-0 mt-2 rounded-md shadow-lg bg-white">
            <div className="py-1">
              {Object.values(supportedChains).map((chain: Chain) => {
                return (
                  <button
                    key={chain.name}
                    onClick={() => selectChain(chain)}
                    className="flex w-full pl-2 pr-2 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left disabled:opacity-40"
                    disabled={
                      chain.name === currentChain.name || !chain.enabled
                    }
                  >
                    <ChainMenuItem chain={chain} testnet={chain.testNetwork} />
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
