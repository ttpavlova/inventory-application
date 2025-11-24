import { useEffect, useState } from "react";
import { delay } from "../components/helpers/delay";
import type { GetListResponse, List } from "../types/types";

export const useApiShoes = <T>(url: string) => {
  const [data, setData] = useState<List<T> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(url);
        await delay(500);

        if (response.ok) {
          const result: GetListResponse<T> = await response.json();
          if ("items" in result) {
            setData(result);
          }
        } else if (response.status === 404) {
          throw new Error("Failed to fetch");
        }
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { items: data?.items, totalCount: data?.totalCount, loading, error };
};
