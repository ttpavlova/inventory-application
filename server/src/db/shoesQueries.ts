import type { ShoeBody, ShoeId } from "../types/types.js";
import { pool } from "./pool.js";

async function getAllShoesQuery() {
  const { rows } = await pool.query("SELECT * FROM view_shoes");

  return rows;
}

async function getShoeByIdQuery(id: ShoeId) {
  const { rows } = await pool.query(`SELECT * FROM view_shoes WHERE id = $1`, [
    id,
  ]);

  return rows[0];
}

async function createShoeQuery({
  gender,
  season,
  category,
  brand,
  material,
  color,
  country,
}: ShoeBody) {
  const { rows } = await pool.query(
    `INSERT INTO shoes (gender, season, category_id, brand_id, material_id, color_id, country_id) 
    VALUES
    (
      $1,
      $2,
      (SELECT id FROM categories WHERE name = $3),
      (SELECT id FROM brands WHERE name = $4),
      (SELECT id FROM materials WHERE name = $5),
      (SELECT id FROM colors WHERE name = $6),
      (SELECT id FROM countries WHERE name = $7)
    )
    RETURNING *;`,
    [gender, season, category, brand, material, color, country]
  );

  return rows[0];
}

async function updateShoeQuery(id: ShoeId, shoeData: ShoeBody) {
  const { gender, season, category, brand, material, color, country } =
    shoeData;
  const { rows } = await pool.query(
    `UPDATE shoes 
    SET 
      gender = $1,
      season = $2,
      category_id = (SELECT id FROM categories WHERE name = $3),
      brand_id = (SELECT id FROM brands WHERE name = $4),
      material_id = (SELECT id FROM materials WHERE name = $5),
      color_id = (SELECT id FROM colors WHERE name = $6),
      country_id = (SELECT id FROM countries WHERE name = $7)
    WHERE id = $8
    RETURNING *;`,
    [gender, season, category, brand, material, color, country, id]
  );

  return rows[0];
}

async function deleteShoeQuery(id: ShoeId) {
  const { rows } = await pool.query(
    `DELETE FROM shoes WHERE id = $1 RETURNING *`,
    [id]
  );

  return rows[0];
}

export {
  getAllShoesQuery,
  getShoeByIdQuery,
  createShoeQuery,
  updateShoeQuery,
  deleteShoeQuery,
};
