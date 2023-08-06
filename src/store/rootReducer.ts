import { combineReducers } from "@reduxjs/toolkit";
import credentialsSlice from "./credentialsSlice";

const rootReducer = combineReducers({
  credentials: credentialsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
