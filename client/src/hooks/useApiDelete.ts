import { useState } from "react";
import { fetchData } from "./fetchData";

export const useApiDelete = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async () => {
    setLoading(true);
    setError(false);

    try {
      await fetchData(url, { method: "DELETE" });
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, request };
};
