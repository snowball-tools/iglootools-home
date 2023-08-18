import { AuthMethod, SessionSigsMap } from "@lit-protocol/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chain, CHAINS } from "../helpers/chains";
import { SendUserOperationResult } from "@alchemy/aa-core";

export const LoginViews = {
  INITIAL_VIEW: "initial_view",
  SIGN_UP: "sign_up",
  REGISTERING: "registering",
  AUTHENTICATING: "authenticating",
  MINTING: "minting",
  MINTED: "minted",
  WALLET_HOME: "wallet_home",
  ERROR: "error",
  IGLOO_NFT_MINTED: "igloo_nft_minted",
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
  userOpResult: SendUserOperationResult | null;
  ethAddress: string | null;
}

export const initialState: CredentialState = {
  view: LoginViews.INITIAL_VIEW,
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
  userOpResult: null,
  ethAddress: null,
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    authenticated: (state, action: PayloadAction<AuthMethod>) => {
      state.isAuthenticated = true;
      state.currentAuthMethod = action.payload;
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
        view: string;
        ethaddress: string;
      }>
    ) => {
      state.currentPKP = action.payload.currentPKP;
      state.currentPKPEthAddress = action.payload.currentPKPEthAddress;
      state.currentAuthMethod = action.payload.currentAuthMethod;
      state.sessionSigs = action.payload.sessionSigs;
      state.view = action.payload.view;
      state.ethAddress = action.payload.ethaddress;
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
