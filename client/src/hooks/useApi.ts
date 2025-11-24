import { useEffect, useState } from "react";
import { delay } from "../components/helpers/delay";

export const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch(url);
        await delay(500);

        if (!response.ok) {
          if (response.status !== 404) {
            throw new Error("Something went wrong");
          }
        } else {
          const result: T = await response.json();
          setData(result);
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

  return { data, loading, error };
};
