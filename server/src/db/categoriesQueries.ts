import type { CategoryBody, CategoryId, CategoryName } from "../types/types.js";
import { pool } from "./pool.js";

async function getAllCategoriesQuery() {
  const { rows } = await pool.query("SELECT * FROM categories");

  return rows;
}

async function createCategoryQuery(categoryData: CategoryBody) {
  const { name } = categoryData;

  const { rows } = await pool.query(
    `INSERT INTO categories (name) 
    VALUES ($1)
    RETURNING *;`,
    [name]
  );

  return rows[0];
}

async function updateCategoryQuery(id: CategoryId, categoryData: CategoryBody) {
  const { name } = categoryData;

  const { rows } = await pool.query(
    `UPDATE categories 
    SET 
      name = $1
    WHERE id = $2
    RETURNING *;`,
    [name, id]
  );

  return rows[0];
}

async function getShoesByCategoryQuery(category: CategoryName) {
  const { rows } = await pool.query(
    `SELECT * FROM view_shoes WHERE LOWER(category_name) = LOWER($1)`,
    [category]
  );

  return rows;
}

export {
  getAllCategoriesQuery,
  getShoesByCategoryQuery,
  createCategoryQuery,
  updateCategoryQuery,
};
