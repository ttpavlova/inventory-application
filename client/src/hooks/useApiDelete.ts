import { useState } from "react";
import { fetchData } from "./fetchData";
import { API_BASE } from "../lib/apiBase";

export const useApiDelete = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const request = async () => {
    setLoading(true);
    setError(false);

    try {
      await fetchData(`${API_BASE}${url}`, { method: "DELETE" });
    } catch (error) {
      setError(true);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, request };
};
