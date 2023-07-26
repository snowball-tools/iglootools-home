import { Dispatch, createContext } from "react";
import {
  CredentialActionTypes,
  RESTORE_STATE,
  AUTHENTICATED,
  DISCONNECT,
  PENDING_REQUEST,
  REQUEST_HANDLED,
  SWITCH_CHAIN,
} from "../helpers/actions";

import { initialState, CredentialState } from "../helpers/constants";

export function credentialReducer(
  state = initialState,
  action: CredentialActionTypes
): CredentialState {
  switch (action.type) {
    case RESTORE_STATE:
      return action.payload;
    case AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        currentUsername: action.payload.currentUsername,
        currentPKP: action.payload.currentPKP,
        sessionSigs: action.payload.sessionSigs,
        sessionExpiration: action.payload.sessionExpiration,
      };
    case DISCONNECT:
      return initialState;
    case PENDING_REQUEST:
      return {
        ...state,
      };
    case REQUEST_HANDLED:
      return {
        ...state,
      };
    case SWITCH_CHAIN:
      return {
        ...state,
        appChainId: action.payload.appChainId,
      };
    default:
      return state;
  }
}
