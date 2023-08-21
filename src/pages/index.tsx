import React from "react";
import PasskeyMainView from "./PasskeyMainView";
// import { NEXT_PUBLIC_DEBUG } from "@/helpers/env";
import TestView from "@/components/TestView";

const NEXT_PUBLIC_DEBUG = true;

const Home = () => {
  return <>{NEXT_PUBLIC_DEBUG ? <TestView /> : <PasskeyMainView />}</>;
};

export default Home;
