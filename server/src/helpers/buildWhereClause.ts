export const buildWhereClause = (categoriesIds: string[]) => {
  let paramCount = 0;
  let query = "";

  if (categoriesIds.length > 0) {
    const placeholders = categoriesIds
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map((_, i) => `$${(paramCount += 1)}`)
      .join(", ");
    query += ` WHERE category_id IN (${placeholders}) `;
  }

  return query;
};

// Example:
// Input: ['1', '2']
// Output: ` WHERE category_id IN ($1, $2) `;
