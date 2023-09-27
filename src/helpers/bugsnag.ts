import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import {
  BUGSNAG_API_KEY,
  NEXT_PUBLIC_APP_VERSION,
  NEXT_PUBLIC_DEBUG,
} from "@/helpers/env";
import React from "react";

Bugsnag.start({
  apiKey: BUGSNAG_API_KEY,
  plugins: [new BugsnagPluginReact()],
  appVersion: NEXT_PUBLIC_APP_VERSION,
  releaseStage: NEXT_PUBLIC_DEBUG === "true" ? "development" : "production",
});

export const ErrorBoundary =
  Bugsnag.getPlugin("react")?.createErrorBoundary(React);

export function logInfo(where: string, message: string) {
  NEXT_PUBLIC_DEBUG === "true" ? console.log(where, message) : null;
  Bugsnag.addMetadata("log", where, message);
}

export function logWarning(message: string) {
  NEXT_PUBLIC_DEBUG === "true" ? console.warn(message) : null;
  Bugsnag.notify(new Error(message));
}

export function logErrorMsg(message: string) {
  NEXT_PUBLIC_DEBUG === "true" ? console.error(message) : null;
  Bugsnag.notify(new Error(message));
}

export function logMetadata(about: string, key: string, value: string) {
  NEXT_PUBLIC_DEBUG === "true" ? console.log(about, key, value) : null;
  Bugsnag.addMetadata(about, key, value);
}

export function logError(error: Error) {
  NEXT_PUBLIC_DEBUG === "true" ? console.error(error) : null;
  Bugsnag.notify(error);
}

export function startSession() {
  NEXT_PUBLIC_DEBUG === "true" ? console.log("startSession") : null;
  Bugsnag.startSession();
}

export function logUser(id: string, username: string) {
  NEXT_PUBLIC_DEBUG === "true" ? console.log(id, username) : null;
  Bugsnag.setUser(id, username);
}
