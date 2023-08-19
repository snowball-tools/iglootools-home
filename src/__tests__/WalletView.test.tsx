import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WalletView from "@/pages/WalletView";
import { Chain } from "@/helpers/chains";

describe("WalletView Component", () => {
  const mockProps = {
    chain: {} as Chain,
    supportedChains: {},
    switchChainAction: jest.fn(),
    ethAddress: "0x12345",
    mintNftAction: jest.fn(),
    exitAction: jest.fn(),
    openInBlockExplorerAction: jest.fn(),
    copyAddressAction: jest.fn(),
  };

  beforeEach(() => {
    render(<WalletView {...mockProps} />);
  });

  it("renders the welcome message", () => {
    expect(
      screen.getByText("Welcome to your smart wallet")
    ).toBeInTheDocument();
  });

  it("renders the user's eth address", () => {
    expect(screen.getByText(mockProps.ethAddress)).toBeInTheDocument();
  });

  it("calls the copyAddressAction when 'Copy address' button is clicked", () => {
    const copyButton = screen.getByText("Copy address");
    fireEvent.click(copyButton);
    expect(mockProps.copyAddressAction).toHaveBeenCalledTimes(1);
  });

  it("calls the openInBlockExplorerAction when 'View on Etherscan' button is clicked", () => {
    const etherscanButton = screen.getByText("View on Etherscan");
    fireEvent.click(etherscanButton);
    expect(mockProps.openInBlockExplorerAction).toHaveBeenCalledTimes(1);
  });

  it("calls the mintNftAction when 'Mint NFT' button is clicked", () => {
    const mintButton = screen.getByText("Mint NFT");
    fireEvent.click(mintButton);
    expect(mockProps.mintNftAction).toHaveBeenCalledTimes(1);
  });
});
