export const APP_NAME = "Ripperdoc's Terminal";
export const APP_ROUTE_PREFIX = "/terminal";
export const API_ROUTE_PREFIX = "/api/admin";

export const API_ROUTES = {
  products: {
    base: `${API_ROUTE_PREFIX}/products`,
    byId: (id: string) => `${API_ROUTE_PREFIX}/products/${id}`,
    feature: (id: string) => `${API_ROUTE_PREFIX}/products/${id}/feature`,
    unfeature: (id: string) => `${API_ROUTE_PREFIX}/products/${id}/unfeature`,
    restore: (id: string) => `${API_ROUTE_PREFIX}/products/${id}/restore`,
    hardDelete: (id: string) => `${API_ROUTE_PREFIX}/products/${id}/hard`,
  },
  productRatings: {
    base: `${API_ROUTE_PREFIX}/ratings`,
    byId: (id: string) => `${API_ROUTE_PREFIX}/ratings/${id}`,
    restore: (id: string) => `${API_ROUTE_PREFIX}/ratings/${id}/restore`,
    byProductId: (id: string) => `${API_ROUTE_PREFIX}/ratings/by-product/${id}`,
    byUserId: (id: string) => `${API_ROUTE_PREFIX}/ratings/by-user/${id}`,
  },
  categories: {
    base: `${API_ROUTE_PREFIX}/categories`,
    byId: (id: string) => `${API_ROUTE_PREFIX}/categories/${id}`,
    hardDelete: (id: string) => `${API_ROUTE_PREFIX}/categories/${id}/hard`,
    restore: (id: string) => `${API_ROUTE_PREFIX}/categories/${id}/restore`,
  },
  brands: {
    base: `${API_ROUTE_PREFIX}/brands`,
    byId: (id: string) => `${API_ROUTE_PREFIX}/brands/${id}`,
    hardDelete: (id: string) => `${API_ROUTE_PREFIX}/brands/${id}/hard`,
    restore: (id: string) => `${API_ROUTE_PREFIX}/brands/${id}/restore`,
  },
  customers: { base: `${API_ROUTE_PREFIX}/customers` },
  auth: {
    login: `/api/auth/login`,
    logout: `/api/auth/logout`,
    whoami: `/api/auth/whoami`,
  },
  images: {
    base: `${API_ROUTE_PREFIX}/images`,
    // byId: (id: string) => `${API_ROUTE_PREFIX}/images/${id}`,
    upload: `${API_ROUTE_PREFIX}/images/upload`,
  },
  // Optional realm
  orders: { base: `${API_ROUTE_PREFIX}/orders` },
};

export const UI_LABELS = {
  products: "Cyberware",
  categories: "Categories",
  brands: "Manufacturers",
  cart: "Loadout",
  customers: "Clients",
  orders: "Installations",
  login: "Jack in",
  logout: "Jack out",
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
