import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InitialView from "@/pages/Views/InitialView";

describe("InitialView", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <InitialView creatNewPasskey={() => {}} useExistingPasskey={() => {}} />
    );
    expect(getByText("igloo")).toBeInTheDocument();
    expect(getByText("Create a new passkey")).toBeInTheDocument();
    expect(getByText("Sign in")).toBeInTheDocument();
  });

  it('calls creatNewPasskey when clicking "Create a new passkey" button', () => {
    const creatNewPasskeyMock = jest.fn();
    const { getByText } = render(
      <InitialView
        creatNewPasskey={creatNewPasskeyMock}
        useExistingPasskey={() => {}}
      />
    );

    fireEvent.click(getByText("Create a new passkey"));
    expect(creatNewPasskeyMock).toHaveBeenCalled();
  });

  it('calls useExistingPasskey when clicking "Sign in" button', () => {
    const useExistingPasskeyMock = jest.fn();
    const { getByText } = render(
      <InitialView
        creatNewPasskey={() => {}}
        useExistingPasskey={useExistingPasskeyMock}
      />
    );

    fireEvent.click(getByText("Sign in"));
    expect(useExistingPasskeyMock).toHaveBeenCalled();
  });
});
