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
};

export interface LoginState {
  view: string;
  username: string;
  errorMsg: string;
}

export const initialState: LoginState = {
  view: LoginViews.SIGN_UP,
  username: "",
  errorMsg: "",
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
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },
  },
});

export const { setView, setUsername, setErrorMsg } = loginSlice.actions;

export default loginSlice.reducer;
