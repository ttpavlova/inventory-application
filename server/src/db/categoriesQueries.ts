import type { Category, CategoryBody, CategoryId } from "../types/types.js";
import { pool } from "./pool.js";

async function getAllCategoriesQuery(): Promise<Category[]> {
  const { rows } = await pool.query("SELECT * FROM categories");

  return rows;
}

async function createCategoryQuery(
  categoryData: CategoryBody
): Promise<Category> {
  const { name } = categoryData;

  const { rows } = await pool.query(
    `INSERT INTO categories (name) 
    VALUES ($1)
    RETURNING *;`,
    [name]
  );

  return rows[0];
}

async function updateCategoryQuery(
  id: CategoryId,
  categoryData: CategoryBody
): Promise<Category> {
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

async function deleteCategoryQuery(id: CategoryId): Promise<Category> {
  const { rows } = await pool.query(
    `DELETE FROM categories WHERE id = $1 RETURNING *`,
    [id]
  );

  return rows[0];
}

async function getShoesByCategoryQuery(id: CategoryId): Promise<Category[]> {
  const { rows } = await pool.query(
    `SELECT 
      s.id,
      s.gender,
      s.season,
      c.name AS category,
      b.name AS brand,
      m.name AS material,
      col.name AS color
    FROM shoes s
    JOIN categories c ON s.category_id = c.id
    JOIN brands b ON s.brand_id = b.id
    JOIN materials m ON s.material_id = m.id
    JOIN colors col ON s.color_id = col.id
    WHERE s.category_id = $1`,
    [id]
  );

  return rows;
}

export {
  getAllCategoriesQuery,
  createCategoryQuery,
  updateCategoryQuery,
  deleteCategoryQuery,
  getShoesByCategoryQuery,
};
