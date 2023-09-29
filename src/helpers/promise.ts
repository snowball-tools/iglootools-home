import { logError, logInfo } from "./bugsnag";

export async function retry<T extends (...arg0: any[]) => any>(
  fn: T,
  args: Parameters<T>,
  maxTry: number,
  retryCount = 1
): Promise<Awaited<ReturnType<T>>> {
  const currRetry = typeof retryCount === "number" ? retryCount : 1;
  try {
    const result = await fn(...args);
    return result;
  } catch (e) {
    logInfo("retry", `Retry ${currRetry} failed.`);
    if (currRetry > maxTry) {
      logError(
        new Error(`[retry] All retry attempts exhausted. ${JSON.stringify(e)}`)
      );
      throw e;
    }
    return retry(fn, args, maxTry, currRetry + 1);
  }
}
