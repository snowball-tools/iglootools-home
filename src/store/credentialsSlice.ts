import { SessionSigsMap } from "@lit-protocol/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chain, CHAINS } from "../helpers/chains";
import { SendUserOperationResult } from "@alchemy/aa-core";

export const LoginViews = {
  SIGN_UP: "sign_up",
  SIGN_IN: "sign_in",
  REGISTERING: "registering",
  AUTHENTICATING: "authenticating",
  MINTING: "minting",
  MINTED: "minted",
  CREATING_SESSION: "creating_session",
  SESSION_CREATED: "session_created",
  ERROR: "error",
  IGLOO_NFT_MINTED: "igloo_nft_minted",
};

export interface CredentialState {
  view: string;
  isAuthenticated: boolean;
  username: string;
  currentPKP: string | null;
  sessionSigs: SessionSigsMap;
  sessionExpiration: string | null;
  currentAppChain: Chain;
  appChains: { [key: string]: Chain };
  errorMsg: string | null;
  userOpResult: SendUserOperationResult | null;
}

export const initialState: CredentialState = {
  view: LoginViews.SIGN_UP,
  isAuthenticated: false,
  username: "",
  currentPKP: null,
  sessionSigs: {},
  sessionExpiration: null,
  currentAppChain: CHAINS.goerli,
  appChains: CHAINS,
  errorMsg: null,
  userOpResult: null,
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    restoreState: () => initialState,
    authenticated: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
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
    setMintedNFT: (state, action: PayloadAction<SendUserOperationResult>) => {
      state.userOpResult = action.payload;
      state.view = LoginViews.IGLOO_NFT_MINTED;
    },
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
      state.view = LoginViews.ERROR;
    },
  },
});

export const {
  restoreState,
  authenticated,
  disconnect,
  switchChain,
  setView,
  setUsername,
  setMintedNFT,
  setErrorMsg,
} = credentialsSlice.actions;

export default credentialsSlice.reducer;
