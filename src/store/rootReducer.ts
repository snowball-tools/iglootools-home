import { combineReducers } from "@reduxjs/toolkit";
import credentialsSlice from "./credentialsSlice";
import loginSlice from "./loginSlice";

const rootReducer = combineReducers({
  credentials: credentialsSlice,
  login: loginSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
