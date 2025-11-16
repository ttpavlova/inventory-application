import { useQuery } from "@tanstack/react-query";
import type { Category, ResponseParams } from "../types/types";

export const useGetCategoriesQuery = () => {
  const fetchCategories = async (): Promise<ResponseParams<Category[]>> => {
    const response = await fetch(`/api/categories`);
    return await response.json();
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return { isPending, error, data: data?.data, isFetching };
};
