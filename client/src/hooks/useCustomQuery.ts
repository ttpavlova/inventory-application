import { useQuery } from "@tanstack/react-query";
import type { ResponseParams, Shoe } from "../types/types";

export const useCustomQuery = () => {
  const fetchShoes = async (): Promise<ResponseParams<Shoe[]>> => {
    const response = await fetch("/api/shoes");
    return await response.json();
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["shoeList"],
    queryFn: fetchShoes,
  });

  return { isPending, error, data: data?.data, isFetching };
};
