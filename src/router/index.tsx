import { createBrowserRouter } from "react-router";
import DashboardLayout from "@/layout/DashboardLayout";
import Products from "@/pages/Products";
import Users from "@/pages/Users";
import NotFound from "@/pages/NotFound";
import Categories from "@/pages/Categories";
import Brands from "@/pages/Brands";

import { APP_ROUTES, APP_ROUTE_PREFIX } from "@/lib/routes";
import Login from "@/pages/Login";

export const router = createBrowserRouter([
  {
    path: APP_ROUTE_PREFIX,
    element: <DashboardLayout />,
    children: [
      // { index: true, element: <Dashboard /> },
      { path: APP_ROUTES.categories.url, element: <Categories />, index: true },
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
