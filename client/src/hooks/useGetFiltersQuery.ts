import { useQuery } from "@tanstack/react-query";
import type { ResponseParamsFilters } from "../types/types";

export const useGetFiltersQuery = () => {
  const fetchFilters = async (): Promise<ResponseParamsFilters> => {
    const response = await fetch(`/api/filters`);
    return await response.json();
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["filters"],
    queryFn: fetchFilters,
  });

  return { isPending, error, data: data?.data, isFetching };
};
