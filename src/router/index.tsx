import { createBrowserRouter } from "react-router";
import DashboardLayout from "@/layout/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import Products from "@/pages/Products";
import Users from "@/pages/Users";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "users", element: <Users /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
