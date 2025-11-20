import { useState } from "react";
import type { ShoeBody } from "../types/types";
import { delay } from "../components/helpers/delay";

export const usePostShoe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createShoe = async (newShoe: ShoeBody) => {
    if (!loading) {
      setLoading(true);
    }

    try {
      await delay(500);

      const response = await fetch(`/api/shoes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShoe),
      });

      if (response.ok) {
        const successData = await response.json();
        console.log("Success response: ", successData);
      } else {
        const jsonData = await response.json();
        console.log("Error response object is: ", jsonData);
        setError("Failed to create a shoe");
      }
    } catch (error) {
      setError("Something went wrong");
      console.log(error, "IN CATCH");
    }

    setLoading(false);
  };

  return { loading, error, createShoe };
};
