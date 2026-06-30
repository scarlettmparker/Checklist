import { RouteObject, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ItemsPage from "./routes/items";
import CreateItemPage from "./routes/items/create";
import TemplatesPage from "./routes/templates";
import CreateTemplatePage from "./routes/templates/create";
import EntriesPage from "./routes/entry";
import CreateEntryFromTemplatePage from "./routes/entry/create";

const NotFound = lazy(() => import("~/routes/not-found"));
const ItemDetailsPage = lazy(() => import("~/routes/items/[id]"));
const TemplateDetailsPage = lazy(() => import("~/routes/templates/[id]"));
const EntryChecklistPage = lazy(() => import("~/routes/entry/[id]"));

/**
 * List of routes.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <EntriesPage />,
  },
  {
    path: "entry/create",
    element: <CreateEntryFromTemplatePage />,
  },
  {
    path: "entry/:id",
    element: (
      <Suspense fallback={null}>
        <EntryChecklistPage />
      </Suspense>
    ),
  },
  {
    path: "items",
    element: <ItemsPage />,
    children: [
      {
        path: ":id",
        element: (
          <Suspense fallback={null}>
            <ItemDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "items/create",
    element: <CreateItemPage />,
  },
  {
    path: "templates",
    element: <TemplatesPage />,
    children: [
      {
        path: ":id",
        element: (
          <Suspense fallback={null}>
            <TemplateDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "templates/create",
    element: <CreateTemplatePage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const Router = () => {
  return useRoutes(routes);
};
