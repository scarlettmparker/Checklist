import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { initReactI18next } from "react-i18next";
import ReactDOM from "react-dom/client";
import i18n from "i18next";
import { Suspense } from "react";

import Layout from "./components/layout";
import ErrorBoundary from "~/components/error-boundary";
import { initClientBootstrap } from "@sun/ssr";
import { PostHogProvider } from "@sun/utils";
import { loadPersistedTheme } from "@sun/themes";
import "./utils/configure-framework";
import "@sun/components/style.css";
import "@sun/themes/style.css";

// Reapply the user's persisted theme before mount to avoid a flash.
loadPersistedTheme();

i18n.use(initReactI18next);

initClientBootstrap({ i18n })
  .then(() => {
    ReactDOM.hydrateRoot(
      document.getElementById("app") as HTMLElement,
      <PostHogProvider client>
        <BrowserRouter>
          <Layout>
            <ErrorBoundary>
              <Suspense fallback={null}>
                <Router />
              </Suspense>
            </ErrorBoundary>
          </Layout>
        </BrowserRouter>
      </PostHogProvider>,
    );
  })
  .catch((error) => {
    console.error("Client bootstrap failed", error);
  });
