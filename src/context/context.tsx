import React, { createContext, useContext, useReducer, useEffect } from "react";
import { credentialReducer } from "../reducers/reducer";
import { CredentialState, initialState, STATE_KEY } from "../helpers/constants";
import { CredentialActionTypes, RESTORE_STATE } from "../helpers/actions";

export const AppContext = createContext(initialState);
export const AppDispatchContext = createContext(
  (action: CredentialActionTypes) => {}
);

export function AppProvider({ children }: React.PropsWithChildren) {
  const [state, dispatch] = useReducer(credentialReducer, initialState);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const storedState = localStorage.getItem(STATE_KEY);
      if (storedState) {
        const parsedState = JSON.parse(storedState) as CredentialState;
        dispatch({
          type: RESTORE_STATE,
          payload: parsedState,
        });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppContext.Provider>
  );
}

export function useAppState() {
  return useContext(AppContext);
}

export function useAppDispatch() {
  return useContext(AppDispatchContext);
}
