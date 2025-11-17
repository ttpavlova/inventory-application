import { useQuery } from "@tanstack/react-query";
import type { ResponseParams, Shoe } from "../types/types";

export const useGetShoesQuery = (page = 1) => {
  const fetchShoes = async (): Promise<ResponseParams<Shoe[]>> => {
    const response = await fetch(`/api/shoes?page=${page}`);
    return await response.json();
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["shoeList", page],
    queryFn: fetchShoes,
  });

  return { isPending, error, data, isFetching };
};
