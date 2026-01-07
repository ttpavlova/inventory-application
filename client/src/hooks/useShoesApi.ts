import { buildFilterParams } from "../helpers/buildFilterParams";
import type { ShoeBody } from "../schemas/schemas";
import type {
  Category,
  List,
  ShoeDetailsDto,
  ShoeListItemDto,
  FiltersDto,
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

  return useApiQuery<List<ShoeListItemDto>>(
    `/api/shoes/?page=${page}&limit=${limit}${filtersQuery}`
  );
};

export const useGetShoeById = (id: number) => {
  return useApiQuery<ShoeDetailsDto>(`/api/shoes/${id}`);
};

export const useCreateShoe = () => {
  return useApiMutation<ShoeBody, ShoeListItemDto>("/api/shoes", "POST");
};

export const useUpdateShoe = (id: number) => {
  return useApiMutation<ShoeBody, ShoeListItemDto>(`/api/shoes/${id}`, "PUT");
};

export const useDeleteShoe = (id: number) => {
  return useApiDelete(`/api/shoes/${id}`);
};

export const useGetAllCategories = (gender?: string) => {
  const param = gender ? `?gender=${gender}` : "";

  return useApiQuery<Category[]>(`/api/categories${param}`);
};

export const useGetAllFilters = () => {
  return useApiQuery<FiltersDto>(`/api/filters`);
};
