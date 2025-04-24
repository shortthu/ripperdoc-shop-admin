import { createBrowserRouter } from "react-router";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Users from "@/pages/Users";
import NotFound from "@/pages/NotFound";
import Categories from "@/pages/Categories";
import Brands from "@/pages/Brands";

import { APP_ROUTES } from "@/lib/routes";

export const router = createBrowserRouter([
  {
    path: "/admin",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: APP_ROUTES.categories, element: <Categories /> },
      { path: APP_ROUTES.brands, element: <Brands /> },
      { path: APP_ROUTES.products, element: <Products /> },
      { path: APP_ROUTES.customers, element: <Users /> },
      { path: APP_ROUTES.orders },
      { path: APP_ROUTES.login },
      { path: APP_ROUTES.logout },
      { path: "me" },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
