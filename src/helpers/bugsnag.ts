import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact, {
  BugsnagErrorBoundary,
} from "@bugsnag/plugin-react";
import {
  BUGSNAG_API_KEY,
  NEXT_PUBLIC_APP_VERSION,
  NEXT_PUBLIC_DEBUG,
} from "@/helpers/env";
import React from "react";
import va from "@vercel/analytics";

export let ErrorBoundary: BugsnagErrorBoundary;

export function start() {
  if (ErrorBoundary) {
    NEXT_PUBLIC_DEBUG ? console.log("Bugsnag already started") : null;
    return;
  }
  Bugsnag.start({
    apiKey: BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
    appVersion: NEXT_PUBLIC_APP_VERSION,
    releaseStage: NEXT_PUBLIC_DEBUG ? "development" : "production",
  });
  const reactPlugin = Bugsnag.getPlugin("react");
  if (reactPlugin) {
    ErrorBoundary = reactPlugin.createErrorBoundary(React);
  }
}

export function logInfo(where: string, message: string) {
  NEXT_PUBLIC_DEBUG
    ? console.log(`[logInfo][where: ${where}] ${message}`)
    : va.track(`[logInfo][where: ${where}] ${message}`);
  Bugsnag.addMetadata("log", where, message);
}

export function logWarning(message: string) {
  NEXT_PUBLIC_DEBUG ? console.warn(`[logWarning] ${message}`) : null;
  Bugsnag.notify(new Error(message));
}

export function logErrorMsg(message: string) {
  NEXT_PUBLIC_DEBUG ? console.error(`[logErrorMsg] ${message}`) : null;
  Bugsnag.notify(new Error(message));
}

export function logMetadata(about: string, key: string, value: string) {
  NEXT_PUBLIC_DEBUG
    ? console.log(`[logMetadata][about: ${about}] ${key}: ${value}`)
    : null;
  Bugsnag.addMetadata(about, key, value);
}

export function logError(error: Error) {
  NEXT_PUBLIC_DEBUG
    ? console.error(`[logError] ${JSON.stringify(error)}`)
    : null;
  Bugsnag.notify(error);
}

export function startSession() {
  NEXT_PUBLIC_DEBUG ? console.log(`[startSession] debug`) : null;
  Bugsnag.startSession();
}

export function logUser(id: string, username: string) {
  NEXT_PUBLIC_DEBUG
    ? console.log(`[logUser] ${id}: ${username}`)
    : va.track(`[logUser] ${id}: ${username}`);
  Bugsnag.setUser(id, username);
}
