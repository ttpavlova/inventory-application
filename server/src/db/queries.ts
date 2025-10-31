import type { ShoeParams } from "../types/types.js";
import { pool } from "./pool.js";

async function getAllShoes() {
  const { rows } = await pool.query("SELECT * FROM view_shoes");

  return rows;
}

async function getShoeById(id: string) {
  const { rows } = await pool.query(`SELECT * FROM view_shoes WHERE id = $1`, [
    id,
  ]);

  return rows[0] || null;
}

async function insertShoe({
  gender,
  season,
  category,
  brand,
  material,
  color,
  country,
}: ShoeParams) {
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

export { getAllShoes, getShoeById, insertShoe };
