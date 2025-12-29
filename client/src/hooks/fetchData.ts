import { delay } from "../helpers/delay";

export const fetchData = async <Output>(
  url: string,
  options: RequestInit
): Promise<Output | null> => {
  await delay(500);

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      return null;
    }

    throw new Error(data.message);
  }

  if (response.status === 204) {
    return null;
  }

  return data;
};
