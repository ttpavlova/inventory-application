export const buildWhereClause = (categoriesIds: string[]) => {
  let paramCount = 1;
  let query = "";

  if (categoriesIds.length > 0) {
    const placeholders = categoriesIds
      .map((_, i) => `$${(paramCount += i)}`)
      .join(", ");
    query += ` WHERE category_id IN (${placeholders}) `;
  }

  return query;
};

// Example:
// Input: ['1', '2']
// Output: ` WHERE category_id IN ($1, $2) `;
