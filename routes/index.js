/**
 * @fileoverview Defines and sets up all application routes.
 * @module routes
 */
import { renderApp } from "../utils/ssr.js";
import { base, isProduction } from "../config.js";
import { suspenseCache, pageDataRegistry } from "@sun/ssr";
import { Buffer } from "buffer";

/**
 * Clears the in-memory page-data caches so the next SSR render fetches fresh.
 * Used by the e2e stack between tests (dbReset clears the DB; this clears what
 * the server is holding onto). Only meaningful when @sun/ssr is externalized so
 * server.js and the SSR render share one instance.
 */
function clearAppCache() {
  suspenseCache.clear();
  for (const key of Object.keys(pageDataRegistry.pageDataCache)) {
    delete pageDataRegistry.pageDataCache[key];
  }
}

/**
 * Reads a named cookie value from a raw Cookie header.
 *
 * @param {string|undefined} cookieHeader - The full Cookie header string.
 * @param {string} name - Cookie name to read.
 * @returns {string|undefined} Decoded cookie value or undefined if not found.
 */
function getCookieValue(cookieHeader, name) {
  if (!cookieHeader) return undefined;
  for (const part of cookieHeader.split(/;\s*/)) {
    const index = part.indexOf("=");
    if (index < 0) continue;
    const key = part.slice(0, index).trim();
    if (key === name) {
      return decodeURIComponent(part.slice(index + 1));
    }
  }
}

/**
 * Sets up all routes for the Fastify application.
 *
 * @param {import("fastify").FastifyInstance} app - The Fastify application instance.
 * @param {object} vite - The Vite dev server instance (optional, only in development).
 */
export function setupRoutes(app, vite) {
  app.post("/__reset-cache", async (_request, reply) => {
    clearAppCache();
    reply.send({ ok: true });
  });

  app.setNotFoundHandler({ method: ["GET"] }, async (request, reply) => {
    const mutationPayloadCookie = getCookieValue(
      request.headers.cookie,
      "mutation_payload",
    );
    const invalidateCacheCookie = getCookieValue(
      request.headers.cookie,
      "invalidate_cache",
    );
    let mutationPayload = null;
    if (mutationPayloadCookie) {
      try {
        mutationPayload = JSON.parse(
          Buffer.from(mutationPayloadCookie, "base64").toString("utf-8"),
        );
      } catch (_) {
        // Do nothing
      }
    }

    const requestUrl = new URL(request.raw.url, "http://localhost");
    const pathname = requestUrl.pathname;
    if (/\.[^/]+$/.test(pathname)) {
      return reply.callNotFound();
    }

    let url = pathname.replace(base, "");
    if (!url.startsWith("/")) url = "/" + url;
    if (requestUrl.search) url += requestUrl.search;

    const langHeader = request.headers["accept-language"] || "en";
    const locale = langHeader.split(",")[0] || "en";

    // Compute pageName the same way as client getPageName(). The home route "/"
    // renders the entries list, whose components use the "entry" namespace, so
    // it must resolve to "entry" (not "home") or SSR won't load that namespace
    // and the entries page-data key never hydrates.
    const pathOnly = url.split("?")[0];
    const pageName =
      pathOnly === "/" ? "entry" : pathOnly.split("/")[1] || "home";
    const frontendMode = "checklist";

    try {
      await renderApp(
        {
          vite,
          isProduction,
          url,
          locale,
          pageName,
          frontendMode,
          mutationPayload,
          invalidateCacheCookie,
        },
        reply.raw,
      );
    } catch (e) {
      console.error("Error during route handling:", e);
      reply.status(500).send("Internal Server Error: " + e.message);
    }
  });
}
