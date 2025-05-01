import axiosInstance from "@/api/axiosInstance";
import { API_ROUTES } from "@/lib/routes";

export interface ProductDTO {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  isFeatured: boolean;
  categoryId: string;
  brandId: string;
}

export const productsService = {
  getAll: (includeDeleted = false, page?: number, pageSize?: number) => {
    return axiosInstance.get(API_ROUTES.products.base, {
      params: {
        includeDeleted,
        page,
        pageSize,
      },
    });
  },
  create: (product: ProductDTO) => {
    return axiosInstance.post(API_ROUTES.products.base, product);
  },
  getById: (productId: string) => {
    return axiosInstance.get(API_ROUTES.products.byId(productId));
  },
  update: (productId: string, product: ProductDTO) => {
    return axiosInstance.put(API_ROUTES.products.byId(productId), product);
  },
  feature: (productId: string) => {
    return axiosInstance.post(API_ROUTES.products.feature(productId));
  },
  unfeature: (productId: string) => {
    return axiosInstance.post(API_ROUTES.products.unfeature(productId));
  },
  softDelete: (productId: string) => {
    return axiosInstance.delete(API_ROUTES.products.byId(productId));
  },
  hardDelete: (productId: string) => {
    return axiosInstance.delete(API_ROUTES.products.hardDelete(productId));
  },
  restore: (productId: string) => {
    return axiosInstance.post(API_ROUTES.products.restore(productId));
  },
};
