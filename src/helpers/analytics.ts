import { logError } from "./bugsnag";

const track = async (event: string): Promise<void> => {
  if (typeof window === "undefined") {
    // Server-side environment
    try {
      const { track } = await import("@vercel/analytics/server");
      track(event);
    } catch (error) {
      logError(
        new Error(
          `Error importing track function for server: ${JSON.stringify(error)}`
        )
      );
    }
  } else {
    // Client-side environment
    try {
      const { track } = await import("@vercel/analytics");
      track(event);
    } catch (error) {
      logError(
        new Error(
          `Error importing track function for client: ${JSON.stringify(error)}`
        )
      );
    }
  }
};

export default track;
