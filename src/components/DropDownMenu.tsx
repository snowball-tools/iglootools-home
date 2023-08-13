import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { switchChain } from "@/store/credentialsSlice";
import { Chain } from "@/helpers/chains";

// todo: make generic
const DropDownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentAppChain, appChains } = useSelector(
    (state: RootState) => state.credentials
  );
  const dispatch = useDispatch();

  async function selectChain(chain: Chain) {
    dispatch(switchChain(chain));
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white focus:outline-none"
      >
        {currentAppChain.name}
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white">
          <div className="py-1">
            {Object.values(appChains).map((chain: Chain) => {
              return (
                <button
                  onClick={() => selectChain(chain)}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-right"
                >
                  {chain.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropDownMenu;
