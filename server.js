/**
 * @fileoverview Main entry point for the Fastify server application.
 * Sets up middleware, Vite integration (for development), and routes, then starts the server.
 */

import { createServer } from "@sun/ssr/server";
import {
  port,
  host,
  base,
  isProduction,
  backendHost,
  backendPort,
  clientId,
  clientSecret,
} from "./config.js";
import { configureApi } from "@sun/api";
import { setupRoutes } from "./routes/index.js";
import { registerGalleryProxyRoute } from "./src/server/routes/gallery-proxy.ts";
import { AUTH_COOKIE } from "./src/utils/auth.ts";

configureApi({
  authCookie: AUTH_COOKIE,
  clientId,
  clientSecret,
  appBaseUrl: base,
});

await createServer({
  config: {
    port,
    host,
    base,
    isProduction,
    backendHost,
    backendPort,
    clientSecret,
  },
  setupRoutes,
  configure: async (app) => {
    // Parse native form POST bodies (login/logout use PRG so the browser
    // stores the httpOnly auth cookie, which it won't for a fetch + redirect).
    const { default: formbody } = await import("@fastify/formbody");
    await app.register(formbody);
    registerGalleryProxyRoute(app);
  },
  analytics: {
    app: "checklist",
    authCookie: AUTH_COOKIE,
  },
});
