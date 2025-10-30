import { pool } from "./pool.js";
import type { Shoe } from "./queries.interface.js";

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

async function createShoe({
  gender,
  season,
  category_id,
  brand_id,
  material_id,
  color_id,
  country_id,
}: Shoe) {
  await pool.query(
    `INSERT INTO shoes (gender, season, category_id, brand_id, material_id, color_id, country_id) 
VALUES
  ($1, $2, $3, $4, $5, $6, $7);`,
    [gender, season, category_id, brand_id, material_id, color_id, country_id]
  );
}

export { getAllShoes, getShoeById, createShoe };
