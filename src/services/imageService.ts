import axiosInstance from "@/api/axiosInstance";
import { API_ROUTES } from "@/lib/routes";

export interface ImageUploadResponse {
  imageUrl: string;
}

export const imageService = {
  upload: (form: FormData) => {
    return axiosInstance.post<ImageUploadResponse>(
      API_ROUTES.images.upload,
      form
    );
  },
};
