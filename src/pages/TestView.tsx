import React, { useState } from "react";
import WalletView from "./WalletView";
import Box from "@/components/Box";
import SignInView from "./SignInView";
import MintedIglooNFT from "./MintedIglooNFTView";
import { CHAINS } from "@/helpers/chains";
import InitialView from "./InitialView";

interface TestViewProps {}

interface ViewForTest {
  name: string;
  view: React.ReactNode;
}

const TestView = ({}: TestViewProps) => {
  const [showView, setShowView] = useState<ViewForTest | undefined>(undefined);

  const Views = {
    WALLET: {
      name: "Wallet View",
      view: (
        <WalletView
          mintNftAction={() => setShowView(undefined)}
          ethAddress="0x669E4aCd20Aa30ABA80483fc8B82aeD626e60B60"
          exitAction={() => setShowView(undefined)}
          openInBlockExplorerAction={() => setShowView(undefined)}
          copyAddressAction={() => setShowView(undefined)}
        />
      ),
    },
    SIGNIN: {
      name: "Sign In View",
      view: (
        <SignInView
          signIn={() => setShowView(undefined)}
          createNewPasskey={() => setShowView(undefined)}
          username={""}
          setUsername={() => setShowView(undefined)}
        />
      ),
    },
    MINTEDIGLOO: {
      name: "Minted Igloo NFT View",
      view: (
        <MintedIglooNFT
          chain={CHAINS.goerli}
          openInOpenSeaAction={() => setShowView(undefined)}
          returnToWalletAction={() => setShowView(undefined)}
        />
      ),
    },
    INITIAL: {
      name: "Inital View",
      view: (
        <InitialView
          creatNewPasskey={() => setShowView(undefined)}
          useExistingPasskey={() => setShowView(undefined)}
        />
      ),
    },
  };

  return (
    <Box>
      {showView
        ? showView.view
        : Object.entries(Views).map(([viewName, viewInfo]) => (
            <button
              key={viewName}
              onClick={() => {
                setShowView(viewInfo);
              }}
            >
              {viewInfo.name}
            </button>
          ))}
    </Box>
  );
};

export default TestView;
