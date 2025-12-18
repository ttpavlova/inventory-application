import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";

export const useApiQuery = <Output>(url: string) => {
  const [data, setData] = useState<Output | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const request = async () => {
      setLoading(true);
      setError(false);

      try {
        const data = await fetchData<Output>(url, {
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
