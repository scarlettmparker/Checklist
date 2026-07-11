import React, { Suspense } from "react";
import { createI18nInstance } from "./utils/i18n";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Router, routes } from "./router";
import Layout from "./components/layout";
import NotFound from "./routes/not-found";
import { matchRoutes } from "react-router-dom";
import { inlineCss, generateCssTag } from "@sun/utils";
import "./utils/register-loaders";
import {
  getRequestCache,
  invalidateCache,
  type MutationResult,
} from "@sun/ssr";
import fs from "fs";
import path from "path";

type i18n = {
  translations: Record<string, string>;
  locale: string;
  pageName: string;
};

type RenderProps = {
  url: string;
  translations: i18n["translations"];
  locale: string;
  pageName: string;
  clientJs: string;
  clientCss: string[];
  isProduction: boolean;
  mutationPayload: MutationResult;
  invalidateCacheCookie?: string;
  frontendMode: string;
};

export async function render({
  url,
  locale,
  pageName,
  clientJs,
  clientCss,
  isProduction,
  mutationPayload: _mutationPayload,
  invalidateCacheCookie,
  frontendMode,
}: RenderProps) {
  const posthogKey = process.env.POSTHOG_API_KEY ?? "";
  const posthogHost = process.env.POSTHOG_HOST ?? "";

  if (!clientJs) {
    throw new Error("Missing required clientJs path");
  }

  let shouldDeleteCookie = false;
  if (invalidateCacheCookie) {
    shouldDeleteCookie = invalidateCache(invalidateCacheCookie);
  }

  // Capture this request's page-data cache.
  const pageDataCache = getRequestCache();

  for (const [key, record] of pageDataCache.entries()) {
    if (record.status === "rejected") {
      pageDataCache.delete(key);
    }
  }

  const i18n = createI18nInstance();
  await i18n.init({
    lng: locale,
    fallbackLng: "en",
    resources: {},
    interpolation: { escapeValue: false },
  });

  // Load full translations including plurals for the current page namespace.
  // Try the requested locale, then fall back through en-GB / en so an
  // Accept-Language of "en" or "en-US" still resolves to the bundled en-GB file.
  let translations: Record<string, unknown> = {};
  try {
    for (const candidate of [locale, "en-GB", "en"]) {
      const filePath = path.resolve(
        process.cwd(),
        `messages/${pageName}/${candidate}.json`,
      );
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, "utf-8");
        translations = JSON.parse(fileContent);
        i18n.addResourceBundle(locale, pageName, translations, true, true);
        break;
      }
    }
  } catch {
    // fallback to empty
  }

  // Fetch all themes; inline the default ("greek") so the first paint is themed.
  let theme: Record<string, string> | null = null;
  let themes: { name: string; values: Record<string, string> }[] = [];
  try {
    const endpoint = process.env.GRAPHQL_ENDPOINT || "http://localhost:8083/graphql";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: '{ gaiaQueries { propertySet(ownerKey:"ReactApp", name:"themes") } }',
      }),
    });
    const json = await res.json();
    const map = json?.data?.gaiaQueries?.propertySet;
    if (map && typeof map === "object") {
      themes = Object.entries(map).map(([name, values]) => ({ name, values }));
      theme = map["greek"] ?? null;
    }
  } catch {
    // theme is optional; fall back to the persisted or default theme
  }
  const themeStyle = theme
    ? `<style>:root{${Object.entries(theme).map(([k, v]) => `--${k}:${v};`).join("")}}</style>`
    : "";

  const matches = matchRoutes(routes, url);
  const didMatch = Boolean(matches);

  const App = (
    <React.StrictMode>
      <StaticRouter location={url}>
        <Layout>
          <Suspense fallback={null}>
            <Router />
          </Suspense>
        </Layout>
      </StaticRouter>
    </React.StrictMode>
  );

  const cssContent = await inlineCss(isProduction, clientCss);

  return new Promise((resolve) => {
    let resolved = false;
    let postludeData = "";

    // NOTE: do NOT pass bootstrapModules here. React emits bootstrap modules at
    // the end of its stream (inside #app), which lands BEFORE the postlude
    // script that populates window.__serverCacheData__. Because they're async,
    // the client could boot and read window.__serverCacheData__ while it's still
    // {}, skipping hydratePageData and crashing on first load.
    const stream = renderToPipeableStream(didMatch ? App : <NotFound />, {
      onShellReady() {
        const cssTag = generateCssTag(isProduction, cssContent, clientCss);
        const headers: Record<string, string> = { "Content-Type": "text/html" };
        if (shouldDeleteCookie) {
          headers["Set-Cookie"] =
            "invalidate_cache=; Path=/; Max-Age=0; SameSite=Lax;";
        }
        // React Refresh is dev-only (HMR). In production VITE_SERVER_BASE is
        // unset, so emitting this preamble throws an uncaught module-resolution
        // error in the browser.
        const refreshPreamble = isProduction
          ? ""
          : `<script type="module">
              import RefreshRuntime from '${process.env.VITE_SERVER_BASE}/@react-refresh'
              RefreshRuntime.injectIntoGlobalHook(window)
              window.$RefreshReg$ = () => {}
              window.$RefreshSig$ = () => (type) => type
              window.__vite_plugin_react_preamble_installed__ = true
            </script>`;
        const prelude = `<!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              ${cssTag}
              ${themeStyle}
              <link rel="modulepreload" href="${clientJs}" />
              <title>Checklist | Scarlet Sun</title>
            </head>
            ${refreshPreamble}
            <script>
              window.__translations__ = ${JSON.stringify(translations)};
              window.__posthog_key__ = '${posthogKey}';
              window.__posthog_host__ = '${posthogHost}';
              window.__locale__ = '${locale}';
              window.__themes__ = ${JSON.stringify(themes)};
              window.__serverCacheData__ = {};
              window.__FRONTEND_MODE__ = ${JSON.stringify(frontendMode)};
            </script>
            <body>
              <div id="app">`;
        if (!resolved) {
          resolved = true;
          resolve({
            statusCode: didMatch ? 200 : 404,
            headers,
            prelude,
            postlude: () => postludeData,
            stream,
          });
        }
      },
      onAllReady() {
        const serverCacheData: Record<string, unknown> = {};

        for (const [key, record] of pageDataCache.entries()) {
          if (record.status === "resolved") {
            serverCacheData[key] = record.result;
          }
        }

        postludeData = `</div>
          <script>
          if (window.__serverCacheData__ !== undefined) {
            Object.assign(window.__serverCacheData__, ${JSON.stringify(serverCacheData)});
            if (window.hydratePageDataFromPostlude) {
              window.hydratePageDataFromPostlude(window.__serverCacheData__);
            }
          }
          </script>
          <script type="module" src="${clientJs}"></script>
        </body>
      </html>`;
      },
    });
  });
}
