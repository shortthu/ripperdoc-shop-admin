import axiosInstance from "@/api/axiosInstance";
import { API_ROUTES } from "@/lib/routes";

export const authService = {
  login: (credentials: { email: string; password: string }) => {
    return axiosInstance.post(API_ROUTES.auth.login, credentials);
  },
  logout: () => {
    return axiosInstance.post(API_ROUTES.auth.logout);
  },
};
