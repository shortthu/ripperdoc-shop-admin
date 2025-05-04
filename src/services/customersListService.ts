import axiosInstance from "@/api/axiosInstance";
import { API_ROUTES } from "@/lib/routes";
import { PaginatedResponse } from "@/types/paginatedResponse";
import { Customer } from "@/types/customer";

interface CustomerResponse extends PaginatedResponse<Customer> {
  users: Customer[];
}

export const customersListService = {
  getAll: (includeDeleted = false, page?: number, pageSize?: number) => {
    return axiosInstance.get<CustomerResponse>(API_ROUTES.users.base, {
      params: {
        includeDeleted,
        page,
        pageSize,
      },
    });
  },
};
