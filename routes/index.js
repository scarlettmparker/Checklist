/* global process */
/**
 * @fileoverview Defines and sets up all application routes.
 * @module routes
 */
import { renderApp } from "@sun/ssr/server";
import { base, isProduction, manifestPath } from "../config.js";
import { suspenseCache, pageDataRegistry } from "@sun/ssr";
import { Buffer } from "buffer";
import { createHmac, timingSafeEqual } from "node:crypto";
import {
  AUTH_COOKIE,
  buildAuthCookie,
  clearAuthCookie,
  loginViaGaia,
} from "../src/utils/auth.ts";

/** Pages that do not require an authenticated session. */
const PUBLIC_PAGES = new Set(["/login"]);

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
 * Verifies a JWT's HMAC-SHA256 signature using the configured secret.
 * Returns the decoded payload if valid, null otherwise.
 */
function verifyToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const data = parts[0] + "." + parts[1];
  const expectedSig = createHmac("sha256", secret)
    .update(data)
    .digest("base64url");

  const expectedBuf = Buffer.from(expectedSig);
  const actualBuf = Buffer.from(parts[2]);
  if (
    expectedBuf.length !== actualBuf.length ||
    !timingSafeEqual(expectedBuf, actualBuf)
  ) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
    if (payload.exp && payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
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

  /**
   * Login via PRG: validate against gaia, set the httpOnly cookie, redirect.
   */
  app.post("/__login", async (request, reply) => {
    const { username, password, redirect } = request.body ?? {};
    const token = await loginViaGaia(username, password);
    if (!token) return reply.redirect("/login?error=1");
    reply.header("Set-Cookie", buildAuthCookie(token));
    const redirectTo =
      typeof redirect === "string" &&
      redirect.startsWith("/") &&
      !redirect.startsWith("//")
        ? redirect
        : "/";
    return reply.redirect(redirectTo);
  });

  /**
   * Logout via PRG: clear the cookie, redirect to /login.
   */
  app.post("/__logout", async (_request, reply) => {
    reply.header("Set-Cookie", clearAuthCookie());
    return reply.redirect("/login");
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

    const authDisabled = process.env.AUTH_DISABLED === "true";
    if (!authDisabled) {
      const token = getCookieValue(request.headers.cookie, AUTH_COOKIE);
      if (token && !verifyToken(token)) {
        reply.header("Set-Cookie", clearAuthCookie());
        return reply.redirect(
          `/login?redirect=${encodeURIComponent(request.raw.url)}`,
        );
      }
      const normalizedPath =
        pathname.length > 1 && pathname.endsWith("/")
          ? pathname.replace(/\/+$/, "")
          : pathname;
      const isPublic = PUBLIC_PAGES.has(normalizedPath);
      if (!token && !isPublic) {
        return reply.redirect(
          `/login?redirect=${encodeURIComponent(request.raw.url)}`,
        );
      }
      if (token && isPublic) {
        return reply.redirect("/");
      }
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
          manifestPath,
        },
        reply.raw,
      );
    } catch (e) {
      console.error("Error during route handling:", e);
      reply.status(500).send("Internal Server Error: " + e.message);
    }
  });
}
