import type { FilterParams } from "../types/types.js";

export const buildWhereClause = (filters: FilterParams) => {
  let paramCount = 0;
  let query = "WHERE 1=1"; // a common way to define a query so that it's easier to add parts starting with 'AND ...' conditionally
  const params: string[] = [];

  if (filters.categories && filters.categories.length > 0) {
    const placeholders = filters.categories
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map((_, i) => `$${(paramCount += 1)}`)
      .join(", ");
    query += ` AND category_id IN (${placeholders}) `;
    params.push(...filters.categories);
  }

  if (filters.genders && filters.genders.length > 0) {
    const placeholders = filters.genders
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map((_, i) => `$${(paramCount += 1)}`)
      .join(", ");
    query += ` AND gender IN (${placeholders}) `;
    params.push(...filters.genders);
  }

  return { query, params };
};

// Example:
// Input:
// filters: {
//  categories: ['1', '2']
// }
// Output: ` WHERE 1=1 AND category_id IN ($1, $2) `;
