import { buildWhereClause } from "../helpers/buildWhereClause.js";
import type { ShoeBody } from "../schemas/schemas.js";
import type {
  Shoe,
  ShoeDbWithRelations,
  ShoeId,
  ShoeView,
} from "../types/types.js";
import { pool } from "./pool.js";

async function getShoesQuery(
  page = 1,
  limit = 10,
  categoriesIds: string[]
): Promise<{ rows: ShoeView[]; totalCount: number }> {
  const offset = (page - 1) * limit;
  const query = buildWhereClause(categoriesIds);
  const limitParam = `$${categoriesIds.length + 1}`;
  const offsetParam = `$${categoriesIds.length + 2}`;

  const { rows } = await pool.query(
    `SELECT
      s.id,
      s.gender,
      s.season,
      c.name AS category,
      b.name AS brand,
      m.name AS material,
      col.name AS color,
      COUNT(*) OVER() AS count
    FROM shoes s
    LEFT JOIN categories c ON s.category_id = c.id
    LEFT JOIN brands b ON s.brand_id = b.id
    LEFT JOIN materials m ON s.material_id = m.id
    LEFT JOIN colors col ON s.color_id = col.id
    ${query}
    ORDER BY id
    LIMIT ${limitParam} OFFSET ${offsetParam}`,
    [...categoriesIds, limit, offset]
  );

  const shoes = rows.map((row) => {
    const shoe = { ...row };
    delete shoe.count;
    return shoe;
  });

  return { rows: shoes, totalCount: rows[0]?.count || 0 };
}

async function getShoeByIdQuery(id: ShoeId): Promise<ShoeDbWithRelations> {
  const { rows } = await pool.query(
    `SELECT
      s.id,
      s.gender,
      s.season,
      s.category_id,
      c.name AS category_name,
      s.brand_id,
      b.name AS brand_name,
      s.material_id,
      m.name AS material_name,
      s.color_id,
      col.name AS color_name
    FROM shoes s
    JOIN categories c ON s.category_id = c.id
    JOIN brands b ON s.brand_id = b.id
    JOIN materials m ON s.material_id = m.id
    JOIN colors col ON s.color_id = col.id
    WHERE s.id = $1`,
    [id]
  );

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
};
