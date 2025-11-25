import type { ShoeBody } from "../schemas/schemas";
import type { Category, Filters, List, Shoe, ShoeView } from "../types/types";
import { useFetchMutation } from "./useFetchMutation";
import { useFetchQuery } from "./useFetchQuery";

export const useGetAllShoes = (page: number, limit: number) => {
  return useFetchQuery<List<ShoeView[]>>(
    `/api/shoes/?page=${page}&limit=${limit}`
  );
};

export const useGetShoeById = (id: number) => {
  return useFetchQuery<ShoeView>(`/api/shoes/${id}`);
};

export const useCreateShoe = () => {
  return useFetchMutation<ShoeBody, Shoe>("/api/shoes", "POST");
};

export const useUpdateShoe = (id: number) => {
  return useFetchMutation<ShoeBody, Shoe>(`/api/shoes/${id}`, "PUT");
};

export const useDeleteShoe = (id: number) => {
  return useFetchMutation(`/api/shoes/${id}`, "DELETE");
};

export const useGetAllCategories = () => {
  return useFetchQuery<Category[]>(`/api/categories`);
};

export const useGetAllFilters = () => {
  return useFetchQuery<Filters>(`/api/filters`);
};
