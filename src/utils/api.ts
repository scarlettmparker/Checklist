/**
 * Server-only GraphQL runner. Imported solely from loaders, mutation handlers,
 * and the SSR render graph - never from client-bundled code - so the backend
 * endpoint stays out of the client bundle.
 */

import { print, type DocumentNode } from "graphql";

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
};

const endpoint =
  process.env.GRAPHQL_ENDPOINT || "http://localhost:8083/graphql";

/**
 * Runs a request with backoff so transient backend errors don't surface as 500s.
 */
async function withRetry<T>(
  fn: () => Promise<T>,
  delays: number[],
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i <= delays.length; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < delays.length) {
        await new Promise((resolve) => setTimeout(resolve, delays[i]));
      }
    }
  }
  throw lastError;
}

/**
 * Executes a typed GraphQL document against the backend.
 */
export async function executeDocument<T, V = Record<string, unknown>>(
  document: DocumentNode,
  variables?: V,
): Promise<ApiResponse<T>> {
  try {
    return await withRetry(async () => {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: print(document), variables }),
      });

      if (!response.ok) {
        throw {
          message: `HTTP ${response.status}: ${response.statusText}`,
          statusCode: response.status,
        };
      }

      const result = await response.json();

      if (result.errors) {
        throw {
          message: result.errors
            .map((e: { message: string }) => e.message)
            .join(", "),
          statusCode: 400,
        };
      }

      if (!result.data) {
        throw { message: "No data returned", statusCode: 400 };
      }

      return { success: true, data: result.data as T };
    }, [500, 2000, 4000, 6000]);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "message" in error &&
      "statusCode" in error
    ) {
      return {
        success: false,
        error: error.message as string,
        statusCode: error.statusCode as number,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      statusCode: 500,
    };
  }
}
