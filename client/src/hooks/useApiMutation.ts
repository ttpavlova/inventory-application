import { useState } from "react";
import { fetchData } from "./fetchData";

type Method = "POST" | "PUT";

export const useApiMutation = <Input, Output extends { id: number }>(
  url: string,
  method: Method
) => {
  const [data, setData] = useState<Output | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = async (body: Input) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const options: RequestInit = {
        method,
        body: JSON.stringify(body),
      };

      const data = await fetchData<Output>(url, options);
      setData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, id: data?.id, loading, error, request };
};
