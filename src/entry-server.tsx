import React, { Suspense } from "react";
import { StaticRouter } from "react-router-dom/server";
import { Router, routes } from "./router";
import Layout from "./components/layout";
import NotFound from "./routes/not-found";
import { matchRoutes } from "react-router-dom";
import {
  autoDiscoverRegistrations,
  createRenderer,
  type ResolvedTheme,
} from "@sun/ssr/server";
import { createI18nInstance } from "./utils/i18n";
import "./utils/configure-framework";
import { AUTH_COOKIE } from "./utils/auth";
import { clientId, clientSecret, base } from "../config.js";
import { configureApi } from "@sun/api";

/**
 * Server-only config so every backend call forwards the session JWT and the
 * caller's IP.
 */
configureApi({ authCookie: AUTH_COOKIE, clientId, clientSecret, appBaseUrl: base });

/**
 * Eager-glob the server-only registration modules so their defineLoader /
 * defineMutation calls run once at boot. Must live in app code (not @sun/ssr)
 * since @sun/ssr is externalized.
 */
autoDiscoverRegistrations(
  import.meta.glob("./server/**/*-registrations.ts", { eager: true }),
);

const renderer = createRenderer({
  title: "Checklist | Scarlet Sun",
  posthog: true,
  emitFrontendMode: true,
  initI18n(locale, translations) {
    const i18n = createI18nInstance();
    return i18n.init({
      lng: locale,
      fallbackLng: "en",
      resources: { [locale]: translations } as never,
      interpolation: { escapeValue: false },
    });
  },
  async resolveTheme(): Promise<ResolvedTheme | null> {
    const endpoint =
      process.env.GRAPHQL_ENDPOINT || "http://localhost:8083/graphql";
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query:
            '{ gaiaQueries { propertySet(ownerKey:"ReactApp", name:"themes") } }',
        }),
      });
      const json = await res.json();
      const map = json?.data?.gaiaQueries?.propertySet as
        Record<string, Record<string, string>> | undefined;
      if (map && typeof map === "object") {
        return {
          current: map["greek"] ?? null,
          all: Object.entries(map).map(([name, values]) => ({ name, values })),
        };
      }
    } catch {
      // theme is optional
    }
    return { current: null, all: [] };
  },
});

export async function render(options: {
  url: string;
  locale: string;
  pageName: string;
  clientJs: string;
  clientCss: string[];
  isProduction: boolean;
  mutationPayload?: unknown;
  invalidateCacheCookie?: string;
  frontendMode?: string;
}) {
  const matches = matchRoutes(routes, options.url);
  const didMatch = Boolean(matches);
  const App = (
    <React.StrictMode>
      <StaticRouter location={options.url}>
        <Layout>
          <Suspense fallback={null}>
            <Router />
          </Suspense>
        </Layout>
      </StaticRouter>
    </React.StrictMode>
  );

  return renderer.render({
    app: didMatch ? App : <NotFound />,
    didMatch,
    url: options.url,
    locale: options.locale,
    pageName: options.pageName,
    clientJs: options.clientJs,
    clientCss: options.clientCss,
    isProduction: options.isProduction,
    mutationPayload: options.mutationPayload as never,
    invalidateCacheCookie: options.invalidateCacheCookie,
    frontendMode: options.frontendMode,
  });
}
