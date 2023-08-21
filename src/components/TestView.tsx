import React, { useState } from "react";
import WalletView from "@/pages/WalletView";
import Box from "@/components/Box";
import SignUpView from "@/pages/SignUpView";
import MintedIglooNFT from "@/pages/MintedIglooNFTView";
import { CHAINS } from "@/helpers/chains";
import InitialView from "@/pages/InitialView";
import LoadingAnimation from "./LoadingAnimation";

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
          switchChainAction={() => setShowView(undefined)}
          chain={CHAINS.goerli}
          supportedChains={CHAINS}
        />
      ),
    },
    SIGNIN: {
      name: "Sign In View",
      view: (
        <SignUpView
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
          primaryActionAfterMint={() => setShowView(undefined)}
          returnToWalletAction={() => setShowView(undefined)}
          nftLabel="Igloo #172"
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
    LOADING: {
      name: "Loading View",
      view: <LoadingAnimation />,
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
