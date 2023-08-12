import { SessionSigsMap } from "@lit-protocol/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chain, CHAINS } from "../helpers/chains";

export interface CredentialState {
  isAuthenticated: boolean;
  currentUsername: string | null;
  currentPKP: string | null;
  sessionSigs: SessionSigsMap;
  sessionExpiration: string | null;
  currentAppChain: string;
  appChains: { [key: string]: Chain };
}

export const initialState: CredentialState = {
  isAuthenticated: false,
  currentUsername: null,
  currentPKP: null,
  sessionSigs: {},
  sessionExpiration: null,
  currentAppChain: CHAINS.goerli.name,
  appChains: CHAINS,
};

const credentialsSlice = createSlice({
  name: "credentials",
  initialState,
  reducers: {
    restoreState: () => initialState,
    authenticated: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.currentUsername = action.payload;
    },
    disconnect: () => initialState,
    switchChain: (state, action: PayloadAction<string>) => {
      state.currentAppChain = action.payload;
    },
  },
});

export const { restoreState, authenticated, disconnect, switchChain } =
  credentialsSlice.actions;

export default credentialsSlice.reducer;
