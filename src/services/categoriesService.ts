import axiosInstance from "@/api/axiosInstance";
import { API_ROUTES } from "@/lib/routes";
import { Category } from "@/types/category";

export interface CategoryDTO {
  name: string;
  description: string;
}

export const categoriesService = {
  getAll: (includeDeleted = false) => {
    return axiosInstance.get<Category[]>(API_ROUTES.categories.base, {
      params: {
        includeDeleted,
      },
    });
  },
  create: (category: CategoryDTO) => {
    return axiosInstance.post<Category>(API_ROUTES.categories.base, category);
  },
  getById: (categoryId: string) => {
    return axiosInstance.get<Category>(API_ROUTES.categories.byId(categoryId));
  },
  update: (categoryId: string, category: CategoryDTO) => {
    return axiosInstance.put<Category>(
      API_ROUTES.categories.byId(categoryId),
      category
    );
  },
  softDelete: (categoryId: string) => {
    return axiosInstance.delete<Category>(
      API_ROUTES.categories.byId(categoryId)
    );
  },
  hardDelete: (categoryId: string) => {
    return axiosInstance.delete<Category>(
      API_ROUTES.categories.hardDelete(categoryId)
    );
  },
  restore: (categoryId: string) => {
    return axiosInstance.post<Category>(
      API_ROUTES.categories.restore(categoryId)
    );
  },
};
