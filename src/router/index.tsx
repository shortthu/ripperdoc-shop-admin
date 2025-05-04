import { createBrowserRouter, Navigate } from "react-router";

import DashboardLayout from "@/layout/DashboardLayout";
import { APP_ROUTE_PREFIX, APP_ROUTES } from "@/lib/routes";
import Brands from "@/pages/Brands";
import Categories from "@/pages/Categories";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Products from "@/pages/Products";
import Users from "@/pages/Users";

export const router = createBrowserRouter([
  {
    path: APP_ROUTE_PREFIX,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={APP_ROUTES.categories.url} replace />,
      },
      { path: APP_ROUTES.categories.url, element: <Categories /> },
      { path: APP_ROUTES.brands.url, element: <Brands /> },
      { path: APP_ROUTES.products.url, element: <Products /> },
      { path: APP_ROUTES.customers.url, element: <Users /> },
      { path: APP_ROUTES.orders.url },
      { path: "me" },
    ],
  },
  {
    path: APP_ROUTES.login.url,
    element: <Login />,
  },
  {
    path: APP_ROUTES.logout.url,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
