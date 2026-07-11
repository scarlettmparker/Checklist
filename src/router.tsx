import { RouteObject, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ItemsPage from "./routes/items";
import CreateItemPage from "./routes/items/create";
import TemplatesPage from "./routes/templates";
import CreateTemplatePage from "./routes/templates/create";
import EntriesPage from "./routes/entry";
import CreateEntryFromTemplatePage from "./routes/entry/create";
import CategoriesPage from "./routes/categories";

const NotFound = lazy(() => import("~/routes/not-found"));
const ItemDetailsPage = lazy(() => import("~/routes/items/[id]"));
const EditItemPage = lazy(() => import("~/routes/items/edit"));
const TemplateDetailsPage = lazy(() => import("~/routes/templates/[id]"));
const EditTemplatePage = lazy(() => import("~/routes/templates/edit"));
const EntryChecklistPage = lazy(() => import("~/routes/entry/[id]"));
import { EntryChecklistPageSkeleton } from "~/components/entry/skeletons";
import { EditItemPageSkeleton } from "~/components/items/skeletons";
import { EditTemplatePageSkeleton } from "~/components/templates/skeletons";

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
      <Suspense fallback={<EntryChecklistPageSkeleton />}>
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
        element: <ItemDetailsPage />,
      },
    ],
  },
  {
    path: "items/create",
    element: <CreateItemPage />,
  },
  {
    path: "items/:id/edit",
    element: (
      <Suspense fallback={<EditItemPageSkeleton />}>
        <EditItemPage />
      </Suspense>
    ),
  },
  {
    path: "templates",
    element: <TemplatesPage />,
    children: [
      {
        path: ":id",
        element: <TemplateDetailsPage />,
      },
    ],
  },
  {
    path: "templates/create",
    element: <CreateTemplatePage />,
  },
  {
    path: "templates/:id/edit",
    element: (
      <Suspense fallback={<EditTemplatePageSkeleton />}>
        <EditTemplatePage />
      </Suspense>
    ),
  },
  {
    path: "categories",
    element: <CategoriesPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const Router = () => {
  return useRoutes(routes);
};
