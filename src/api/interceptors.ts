import { AxiosInstance } from "axios";
import { APP_ROUTES } from "@/lib/routes";

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.warn(
          `[api] 401 Unauthorized, redirecting to ${APP_ROUTES.login.url}...`
        );
        window.location.href = APP_ROUTES.login.url;
      } else {
        console.error("[api] Error: ", error.response);
      }
      return Promise.reject(error);
    }
  );
};
