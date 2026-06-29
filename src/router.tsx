import { RouteObject, useRoutes } from "react-router-dom";
import { lazy } from "react";
import ItemsPage from "./routes/items";
import CreateItemPage from "./routes/items/create";

const Index = lazy(() => import("~/routes/index"));
const NotFound = lazy(() => import("~/routes/not-found"));

/**
 * List of routes.
 */
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/items",
    element: <ItemsPage />,
  },
  {
    path: "/items/create",
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
