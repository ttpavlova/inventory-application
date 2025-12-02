import { buildFilterParams } from "../helpers/buildFilterParams";
import type { ShoeBody } from "../schemas/schemas";
import type {
  Category,
  Filters,
  List,
  Shoe,
  ShoeWithRelations,
  ShoeView,
} from "../types/types";
import { useApiDelete } from "./useApiDelete";
import { useApiMutation } from "./useApiMutation";
import { useApiQuery } from "./useApiQuery";

export const useGetAllShoes = (
  page: number,
  limit: number,
  categories: string | null
) => {
  const filters = { categories };
  const filtersQuery = buildFilterParams(filters);

  return useApiQuery<List<ShoeView[]>>(
    `/api/shoes/?page=${page}&limit=${limit}${filtersQuery}`
  );
};

export const useGetShoeById = (id: number) => {
  return useApiQuery<ShoeWithRelations>(`/api/shoes/${id}`);
};

export const useCreateShoe = () => {
  return useApiMutation<ShoeBody, Shoe>("/api/shoes", "POST");
};

export const useUpdateShoe = (id: number) => {
  return useApiMutation<ShoeBody, Shoe>(`/api/shoes/${id}`, "PUT");
};

export const useDeleteShoe = (id: number) => {
  return useApiDelete(`/api/shoes/${id}`);
};

export const useGetAllCategories = () => {
  return useApiQuery<Category[]>(`/api/categories`);
};

export const useGetAllFilters = () => {
  return useApiQuery<Filters>(`/api/filters`);
};
