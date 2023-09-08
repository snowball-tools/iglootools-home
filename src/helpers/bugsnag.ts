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
  Bugsnag.addMetadata("log", where, message);
}

export function logWarning(message: string) {
  Bugsnag.notify(new Error(message));
}

export function logErrorMsg(message: string) {
  Bugsnag.notify(new Error(message));
}

export function logMetadata(about: string, key: string, value: string) {
  Bugsnag.addMetadata(about, key, value);
}

export function logError(error: Error) {
  Bugsnag.notify(error);
}

export function startSession() {
  Bugsnag.startSession();
}

export function logUser(id: string, username: string) {
  Bugsnag.setUser(id, username);
}
