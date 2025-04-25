export const APP_NAME = "Ripperdoc's Terminal";

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
  login: { url: "/admin/jackin", name: UI_LABELS.login },
  logout: { url: "/admin/jackout", name: UI_LABELS.logout },
  dashboard: { url: "/admin", name: "Dashboard" },
  categories: { url: "/admin/categories", name: UI_LABELS.categories },
  brands: { url: "/admin/manufacturers", name: UI_LABELS.brands },
  products: { url: "/admin/cyberwares", name: UI_LABELS.products },
  customers: { url: "/admin/clients", name: UI_LABELS.customers },
  // Optional realm
  orders: { url: "/admin/installations", name: UI_LABELS.orders },
};
