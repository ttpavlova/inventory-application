import type { ShoeBody } from "../schemas/schemas.js";
import type { Shoe, ShoeId, ShoeView } from "../types/types.js";
import { pool } from "./pool.js";

async function getShoesQuery(page = 1, limit = 10): Promise<ShoeView[]> {
  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `SELECT * FROM view_shoes LIMIT ${limit} OFFSET ${offset}`
  );

  return rows;
}

async function getTotalItems(): Promise<number> {
  const { rows } = await pool.query("SELECT COUNT(*) FROM view_shoes");

  return Number(rows[0].count);
}

async function getShoeByIdQuery(id: ShoeId): Promise<ShoeView> {
  const { rows } = await pool.query(`SELECT * FROM view_shoes WHERE id = $1`, [
    id,
  ]);

  return rows[0];
}

async function createShoeQuery({
  gender,
  season,
  categoryId,
  brandId,
  materialId,
  colorId,
}: ShoeBody): Promise<Shoe> {
  const { rows } = await pool.query(
    `INSERT INTO shoes (gender, season, category_id, brand_id, material_id, color_id) 
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`,
    [gender, season, categoryId, brandId, materialId, colorId]
  );

  return rows[0];
}

async function updateShoeQuery(id: ShoeId, shoeData: ShoeBody): Promise<Shoe> {
  const { gender, season, categoryId, brandId, materialId, colorId } = shoeData;
  const { rows } = await pool.query(
    `UPDATE shoes 
    SET 
      gender = $1,
      season = $2,
      category_id = $3,
      brand_id = $4,
      material_id = $5,
      color_id = $6
    WHERE id = $7
    RETURNING *;`,
    [gender, season, categoryId, brandId, materialId, colorId, id]
  );

  return rows[0];
}

async function deleteShoeQuery(id: ShoeId): Promise<Shoe> {
  const { rows } = await pool.query(
    `DELETE FROM shoes WHERE id = $1 RETURNING *`,
    [id]
  );

  return rows[0];
}

export {
  getShoesQuery,
  getShoeByIdQuery,
  createShoeQuery,
  updateShoeQuery,
  deleteShoeQuery,
  getTotalItems,
};
