import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";
import { API_BASE } from "../lib/apiBase";

export const useApiQuery = <Output>(url: string) => {
  const [data, setData] = useState<Output | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const request = async () => {
      setLoading(true);
      setError(false);
      setData(null);

      try {
        const data = await fetchData<Output>(`${API_BASE}${url}`, {
          method: "GET",
        });

        setData(data);
      } catch (error) {
        setError(true);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    request();
  }, [url]);

  return { data, loading, error };
};
