import { useQuery } from "@tanstack/react-query";
import type { ResponseParams, Shoe } from "../types/types";

export const useGetShoeByIdQuery = (id: Shoe["id"]) => {
  const fetchShoeById = async (): Promise<ResponseParams<Shoe>> => {
    const response = await fetch(`/api/shoes/${id}`);
    return await response.json();
  };

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["shoeById"],
    queryFn: fetchShoeById,
  });

  return { isPending, error, data: data?.data, isFetching };
};
