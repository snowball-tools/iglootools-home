import React, { useState } from "react";
import WalletView from "@/pages/Views/WalletView";
import Box from "@/components/Box";
import SignUpView from "@/pages/Views/SignUpView";
import MintedIglooNFT from "@/pages/Views/MintedIglooNFTView";
import { CHAINS } from "@/helpers/chains";
import InitialView from "@/pages/Views/InitialView";
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
      view: <WalletView />,
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
          chain={CHAINS.sepolia}
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
