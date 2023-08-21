import { AuthMethod, SessionSigsMap } from "@lit-protocol/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chain, CHAINS } from "../helpers/chains";

export const AuthViews = {
  INITIAL_VIEW: "initial_view",
  SIGN_UP: "sign_up",
  REGISTERING: "registering",
  AUTHENTICATING: "authenticating",
  MINTING: "minting",
  MINTED: "minted",
  WALLET_HOME: "wallet_home",
  ERROR: "error",
  IGLOO_NFT_MINTING: "igloo_nft_minting",
  IGLOO_NFT_MINTED: "igloo_nft_minted",
  UNSUPPORTED_BROWSER: "unsupported_browser",
};

export interface CredentialState {
  view: string;
  isAuthenticated: boolean;
  username: string;
  currentPKP: string | undefined;
  currentPKPEthAddress: string | undefined;
  currentAuthMethod: AuthMethod | undefined;
  sessionSigs: SessionSigsMap;
  sessionExpiration: string | null;
  currentAppChain: Chain;
  appChains: { [key: string]: Chain };
  errorMsg: string | null;
  userOpHash: string | null;
  ethAddress: string | null;
  nftId: string | null;
}

export const initialState: CredentialState = {
  view: AuthViews.INITIAL_VIEW,
  isAuthenticated: false,
  username: "",
  currentPKP: undefined,
  currentPKPEthAddress: undefined,
  currentAuthMethod: undefined,
  sessionSigs: {},
  sessionExpiration: null,
  currentAppChain: CHAINS.goerli,
  appChains: CHAINS,
  errorMsg: null,
  userOpHash: null,
  ethAddress: null,
  nftId: null,
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    authenticated: (
      state,
      action: PayloadAction<{
        currentAuthMethod: AuthMethod;
        view: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.currentAuthMethod = action.payload.currentAuthMethod;
      state.view = action.payload.view;
    },
    disconnect: () => initialState,
    switchChain: (state, action: PayloadAction<Chain>) => {
      state.currentAppChain = action.payload;
    },
    setView: (state, action: PayloadAction<string>) => {
      state.view = action.payload;
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setMintedNFT: (
      state,
      action: PayloadAction<{
        hash: string;
        nftId: string | null;
      }>
    ) => {
      state.userOpHash = action.payload.hash;
      state.nftId = action.payload.nftId;
      state.view = AuthViews.IGLOO_NFT_MINTED;
    },
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
      state.view = AuthViews.ERROR;
    },
    setCurrentPKP: (
      state,
      action: PayloadAction<{
        currentPKP: string;
        currentPKPEthAddress: string;
      }>
    ) => {
      state.currentPKP = action.payload.currentPKP;
      state.currentPKPEthAddress = action.payload.currentPKPEthAddress;
    },
    setSessionSig: (
      state,
      action: PayloadAction<{
        currentPKP: string;
        currentPKPEthAddress: string;
        currentAuthMethod: AuthMethod;
        sessionSigs: SessionSigsMap;
        ethAddress: string;
      }>
    ) => {
      state.currentPKP = action.payload.currentPKP;
      state.currentPKPEthAddress = action.payload.currentPKPEthAddress;
      state.currentAuthMethod = action.payload.currentAuthMethod;
      state.sessionSigs = action.payload.sessionSigs;
      state.ethAddress = action.payload.ethAddress;
      state.view = AuthViews.WALLET_HOME;
    },
  },
});

export const {
  authenticated,
  disconnect,
  switchChain,
  setView,
  setUsername,
  setMintedNFT,
  setErrorMsg,
  setCurrentPKP,
  setSessionSig,
} = credentialsSlice.actions;

export default credentialsSlice.reducer;
