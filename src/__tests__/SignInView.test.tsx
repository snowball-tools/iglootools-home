import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SignInView from "@/pages/SignInView";

describe("SignInView", () => {
  it("renders without crashing", () => {
    const mockFunctions = {
      signIn: jest.fn(),
      createNewPasskey: jest.fn(),
      setUsername: jest.fn(),
      username: "",
    };

    const { getByText } = render(<SignInView {...mockFunctions} />);
    expect(getByText("Name your passkey")).toBeInTheDocument();
  });

  it('disables "Create passkey" button when username is empty', () => {
    const mockFunctions = {
      signIn: jest.fn(),
      createNewPasskey: jest.fn(),
      setUsername: jest.fn(),
      username: "",
    };

    const { getByText } = render(<SignInView {...mockFunctions} />);
    expect(getByText("Create passkey")).toBeDisabled();
  });

  it('enables "Create passkey" button when username has content', () => {
    const mockFunctions = {
      signIn: jest.fn(),
      createNewPasskey: jest.fn(),
      setUsername: jest.fn(),
      username: "John Doe",
    };

    const { getByText } = render(<SignInView {...mockFunctions} />);
    expect(getByText("Create passkey")).toBeEnabled();
  });

  it("calls setUsername when input changes", () => {
    const mockFunctions = {
      signIn: jest.fn(),
      createNewPasskey: jest.fn(),
      setUsername: jest.fn(),
      username: "",
    };

    const { getByPlaceholderText } = render(<SignInView {...mockFunctions} />);
    const input = getByPlaceholderText("ex. Taylor Swift");

    fireEvent.change(input, { target: { value: "John Doe" } });
    expect(mockFunctions.setUsername).toHaveBeenCalledWith("John Doe");
  });

  it("calls createNewPasskey and signIn on respective button clicks", () => {
    const mockFunctions = {
      signIn: jest.fn(),
      createNewPasskey: jest.fn(),
      setUsername: jest.fn(),
      username: "John Doe",
    };

    const { getByText } = render(<SignInView {...mockFunctions} />);

    fireEvent.click(getByText("Create passkey"));
    expect(mockFunctions.createNewPasskey).toHaveBeenCalledTimes(1);

    fireEvent.click(getByText("Sign in with passkey"));
    expect(mockFunctions.signIn).toHaveBeenCalledTimes(1);
  });
});
