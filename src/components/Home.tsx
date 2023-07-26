"use client";

import { useAppDispatch } from "@/context/context";
import { DISCONNECT } from "@/helpers/actions";
import { initialState } from "@/helpers/constants";

export default function Home() {
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch({
      type: DISCONNECT,
      payload: {
        ...initialState,
      },
    });
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <h1 className="text-4xl font-bold text-white">
          Home - user is authenticated
        </h1>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </>
  );
}
