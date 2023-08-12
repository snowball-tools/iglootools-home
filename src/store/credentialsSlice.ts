import { SessionSigsMap } from "@lit-protocol/types";
import { createSlice } from "@reduxjs/toolkit";
import { Chain, CHAINS } from "../helpers/chains";

export interface CredentialState {
  isAuthenticated: boolean;
  currentUsername: string | null;
  currentPKP: string | null;
  sessionSigs: SessionSigsMap;
  sessionExpiration: string | null;
  appChainId: number;
  appChains: { [key: string]: Chain };
}

export const initialState: CredentialState = {
  isAuthenticated: false,
  currentUsername: null,
  currentPKP: null,
  sessionSigs: {},
  sessionExpiration: null,
  appChainId: CHAINS.goerli.chainId,
  appChains: CHAINS,
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    restoreState: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    authenticated: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    disconnect: () => initialState,
    pendingRequest: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    requestHandled: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    switchChain: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  restoreState,
  authenticated,
  disconnect,
  pendingRequest,
  requestHandled,
  switchChain,
} = credentialsSlice.actions;

export default credentialsSlice.reducer;
