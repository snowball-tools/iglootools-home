import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  initialState,
  restoreState,
  authenticated,
  disconnect,
} from "../store/credentialsSlice";
import { RootState } from "../store/rootReducer";

const Login: React.FC = () => {
  const credentials = useSelector((state: RootState) => state.credentials);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Welcome to SomePage</h1>

      {credentials.isAuthenticated ? (
        <p>Welcome, {credentials.currentUsername}!</p>
      ) : (
        <p>Please log in.</p>
      )}

      <button
        onClick={() =>
          dispatch(
            authenticated({ isAuthenticated: true, currentUsername: "user123" })
          )
        }
      >
        Log In
      </button>

      <button onClick={() => dispatch(disconnect())}>Log Out</button>

      <button onClick={() => dispatch(restoreState(initialState))}>
        Restore Initial State
      </button>
    </div>
  );
};

export default Login;
