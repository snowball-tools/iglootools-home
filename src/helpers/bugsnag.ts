import Bugsnag from "@bugsnag/js";
import exp from "constants";

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
