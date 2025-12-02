import type { FilterParams } from "../types/types";

export const buildFilterParams = (filters: FilterParams) => {
  return Object.entries(filters)
    .filter((filter) => Boolean(filter[1]))
    .map(([key, value]) => `&${key}=${value}`)
    .join("");
};

// Example:
// Input:
// filters: {
//   categories: '1,2',
//   colors: '3'
// }
// Output:
// `&categories=1,2&colors=3`
