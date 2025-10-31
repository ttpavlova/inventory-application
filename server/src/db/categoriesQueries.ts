import { pool } from "./pool.js";

async function getAllCategoriesQuery() {
  const { rows } = await pool.query("SELECT * FROM categories");

  return rows;
}

async function getShoesByCategoryQuery(category: string) {
  const { rows } = await pool.query(
    `SELECT * FROM view_shoes WHERE LOWER(category_name) = LOWER($1)`,
    [category]
  );

  return rows;
}

export { getAllCategoriesQuery, getShoesByCategoryQuery };
