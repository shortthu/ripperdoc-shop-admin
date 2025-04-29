export const APP_NAME = "Ripperdoc's Terminal";
export const APP_ROUTE_PREFIX = "/terminal";

export const API_ROUTES = {
  products: {
    base: "/api/admin/products",
    featured: "/api/admin/products/:id/featured",
    rating: "/api/admin/products/:id/rating",
  },
  categories: { base: "/api/admin/categories" },
  brands: { base: "/api/admin/brands" },
  customers: { base: "/api/admin/customers" },
  auth: {
    login: "/api/auth/login",
    logout: "/api/auth/logout",
    whoami: "/api/auth/whoami",
  },
  // Optional realm
  orders: { base: "/api/admin/orders" },
};

export const UI_LABELS = {
  products: "Cyberware",
  categories: "Categories",
  brands: "Manufacturers",
  cart: "Loadout",
  customers: "Clients",
  orders: "Installations",
  login: "Jack In",
  logout: "Jack Out",
};

export const APP_ROUTES = {
  login: { url: `${APP_ROUTE_PREFIX}/jackin`, name: UI_LABELS.login },
  logout: { url: `${APP_ROUTE_PREFIX}/jackout`, name: UI_LABELS.logout },
  dashboard: { url: APP_ROUTE_PREFIX, name: "Dashboard" },
  categories: {
    url: `${APP_ROUTE_PREFIX}/categories`,
    name: UI_LABELS.categories,
  },
  brands: { url: `${APP_ROUTE_PREFIX}/manufacturers`, name: UI_LABELS.brands },
  products: { url: `${APP_ROUTE_PREFIX}/cyberwares`, name: UI_LABELS.products },
  customers: { url: `${APP_ROUTE_PREFIX}/clients`, name: UI_LABELS.customers },
  // Optional realm
  orders: { url: `${APP_ROUTE_PREFIX}/installations`, name: UI_LABELS.orders },
};
