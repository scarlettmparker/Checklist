import { RouteObject, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";

const EntriesPage = lazy(() => import("./routes/entry"));
const CreateEntryFromTemplatePage = lazy(() => import("./routes/entry/create"));
const ItemsPage = lazy(() => import("./routes/items"));
const CreateItemPage = lazy(() => import("./routes/items/create"));
const TemplatesPage = lazy(() => import("./routes/templates"));
const CreateTemplatePage = lazy(() => import("./routes/templates/create"));
const CategoriesPage = lazy(() => import("./routes/categories"));

const NotFound = lazy(() => import("~/routes/not-found"));
const ItemDetailsPage = lazy(() => import("~/routes/items/[id]"));
const EditItemPage = lazy(() => import("~/routes/items/edit"));
const TemplateDetailsPage = lazy(() => import("~/routes/templates/[id]"));
const EditTemplatePage = lazy(() => import("~/routes/templates/edit"));
const EntryChecklistPage = lazy(() => import("~/routes/entry/[id]"));
import {
  EntriesPageSkeleton,
  EntryChecklistPageSkeleton,
  CreateEntryFromTemplatePageSkeleton,
} from "~/components/entry/skeletons";
import {
  ItemsPageSkeleton,
  EditItemPageSkeleton,
  CreateItemPageSkeleton,
} from "~/components/items/skeletons";
import {
  TemplatesPageSkeleton,
  EditTemplatePageSkeleton,
  CreateTemplatePageSkeleton,
} from "~/components/templates/skeletons";
import { CategoryListSkeleton } from "~/components/categories/skeletons";

/**
 * List of routes.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense fallback={<EntriesPageSkeleton />}>
        <EntriesPage />
      </Suspense>
    ),
  },
  {
    path: "entry/create",
    element: (
      <Suspense fallback={<CreateEntryFromTemplatePageSkeleton />}>
        <CreateEntryFromTemplatePage />
      </Suspense>
    ),
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
    element: (
      <Suspense fallback={<ItemsPageSkeleton />}>
        <ItemsPage />
      </Suspense>
    ),
    children: [
      {
        path: ":id",
        element: <ItemDetailsPage />,
      },
    ],
  },
  {
    path: "items/create",
    element: (
      <Suspense fallback={<CreateItemPageSkeleton />}>
        <CreateItemPage />
      </Suspense>
    ),
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
    element: (
      <Suspense fallback={<TemplatesPageSkeleton />}>
        <TemplatesPage />
      </Suspense>
    ),
    children: [
      {
        path: ":id",
        element: <TemplateDetailsPage />,
      },
    ],
  },
  {
    path: "templates/create",
    element: (
      <Suspense fallback={<CreateTemplatePageSkeleton />}>
        <CreateTemplatePage />
      </Suspense>
    ),
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
    element: (
      <Suspense fallback={<CategoryListSkeleton />}>
        <CategoriesPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const Router = () => {
  return useRoutes(routes);
};
