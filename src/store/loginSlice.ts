import { SendUserOperationResult } from "@alchemy/aa-core";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export interface LoginState {
  view: string;
  username: string;
  errorMsg: string;
  userOpResult: SendUserOperationResult | undefined;
}

export const initialState: LoginState = {
  view: LoginViews.SIGN_UP,
  username: "",
  errorMsg: "",
  userOpResult: undefined,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
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

export const { setView, setUsername, setErrorMsg, setMintedNFT } =
  loginSlice.actions;

export default loginSlice.reducer;
