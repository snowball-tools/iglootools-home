import React from "react";
import { render, fireEvent } from "@testing-library/react";
import MintedIglooNFTView from "@/pages/Views/MintedIglooNFTView";
import { CHAINS } from "@/helpers/chains";

describe("MintedIglooNFTView", () => {
  const mockOpenInOpenSeaAction = jest.fn();
  const mockReturnToWalletAction = jest.fn();

  const props = {
    nftLabel: "Igloo #172",
    chain: CHAINS.goerli,
    openInOpenSeaAction: mockOpenInOpenSeaAction,
    returnToWalletAction: mockReturnToWalletAction,
  };

  it("renders correctly with provided props", () => {
    const { getByText } = render(
      <MintedIglooNFTView
        nftLabel="Igloo #172"
        chain={CHAINS.goerli}
        primaryActionAfterMint={mockOpenInOpenSeaAction}
        returnToWalletAction={mockReturnToWalletAction}
      />
    );

    expect(getByText("Igloo #172")).toBeInTheDocument();
    expect(getByText("Minted on Goerli")).toBeInTheDocument();
  });

  it('calls the correct action on "View on OpenSea" button click', () => {
    const { getByText } = render(
      <MintedIglooNFTView
        nftLabel="Igloo #172"
        chain={CHAINS.goerli}
        primaryActionAfterMint={mockOpenInOpenSeaAction}
        returnToWalletAction={mockReturnToWalletAction}
      />
    );
    const button = getByText("View on OpenSea");

    fireEvent.click(button);

    expect(mockOpenInOpenSeaAction).toHaveBeenCalled();
  });

  it('calls the correct action on "Return to Wallet" button click', () => {
    const { getByText } = render(
      <MintedIglooNFTView
        nftLabel="Igloo #172"
        chain={CHAINS.goerli}
        primaryActionAfterMint={mockOpenInOpenSeaAction}
        returnToWalletAction={mockReturnToWalletAction}
      />
    );
    const button = getByText("Return to Wallet");

    fireEvent.click(button);

    expect(mockReturnToWalletAction).toHaveBeenCalled();
  });
});
