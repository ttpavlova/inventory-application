import { useState } from "react";
import { fetchData } from "./fetchData";

type Method = "POST" | "PUT" | "DELETE";

export const useFetchMutation = <Input, Output extends { id: number }>(
  url: string,
  method: Method
) => {
  const [data, setData] = useState<Output | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async (body?: Input) => {
    if (!loading) {
      setLoading(true);
    }
    setError(false);

    try {
      const options: RequestInit = {
        method,
      };

      if (method === "POST" || method === "PUT") {
        options.body = JSON.stringify(body);
      }

      const data = await fetchData<Output>(url, options);

      setData(data);
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return method === "DELETE"
    ? { loading, error, request }
    : { data, id: data?.id, loading, error, request };
};
