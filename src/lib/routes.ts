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

export const APP_ROUTES = {
  login: "/admin/jackin",
  logout: "/admin/jackout",
  dashboard: "/admin",
  categories: "/admin/categories",
  brands: "/admin/manufacturers",
  products: "/admin/cyberwares",
  customers: "/admin/clients",
  // Optional realm
  orders: "/admin/installations",
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
