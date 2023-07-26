import { CredentialState } from "./constants";

export const RESTORE_STATE = "RESTORE_STATE";
export const AUTHENTICATED = "AUTHENTICATED";
export const DISCONNECT = "DISCONNECT";
export const PENDING_REQUEST = "PENDING_REQUEST";
export const REQUEST_HANDLED = "REQUEST_HANDLED";
export const SWITCH_CHAIN = "SWITCH_CHAIN";

export interface RestoreStateAction {
  type: typeof RESTORE_STATE;
  payload: CredentialState;
}

interface AuthenticatedAction {
  type: typeof AUTHENTICATED;
  payload: CredentialState;
}

interface DisconnectAction {
  type: typeof DISCONNECT;
  payload: CredentialState;
}

interface PendingRequestAction {
  type: typeof PENDING_REQUEST;
  payload: CredentialState;
}

interface RequestHandledAction {
  type: typeof REQUEST_HANDLED;
  payload: CredentialState;
}

interface SwitchChainAction {
  type: typeof SWITCH_CHAIN;
  payload: CredentialState;
}

export type CredentialActionTypes =
  | RestoreStateAction
  | AuthenticatedAction
  | DisconnectAction
  | PendingRequestAction
  | RequestHandledAction
  | SwitchChainAction;
