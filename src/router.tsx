import { RouteObject, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";
import ItemsPage from "./routes/items";
import CreateItemPage from "./routes/items/create";

const Index = lazy(() => import("~/routes/index"));
const NotFound = lazy(() => import("~/routes/not-found"));
const ItemDetailsPage = lazy(() => import("~/routes/items/[id]"));

/**
 * List of routes.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
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
    path: "*",
    element: <NotFound />,
  },
];

export const Router = () => {
  return useRoutes(routes);
};
