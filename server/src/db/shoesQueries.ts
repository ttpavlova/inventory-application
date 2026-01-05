import { buildWhereClause } from "../helpers/buildWhereClause.js";
import type {
  ParsedFilterParams,
  Shoe,
  ShoeDbWithRelations,
  ShoeId,
  ShoeBodyMutation,
  ShoeListItemDto,
} from "../types/types.js";
import { pool } from "./pool.js";

async function getShoesQuery(
  page = 1,
  limit = 10,
  filters: ParsedFilterParams
): Promise<{ rows: ShoeListItemDto[]; totalCount: number }> {
  const offset = (page - 1) * limit;
  const { query, params } = buildWhereClause(filters);
  const limitParam = `$${params.length + 1}`;
  const offsetParam = `$${params.length + 2}`;

  const { rows } = await pool.query(
    `SELECT
      s.id,
      c_g.gender,
      s.season,
      c.name AS category,
      b.name AS brand,
      m.name AS material,
      col.name AS color,
      COUNT(*) OVER() AS count
    FROM shoes s
    JOIN category_gender c_g ON s.category_gender_id = c_g.id
    JOIN categories c ON c_g.category_id = c.id
    JOIN brands b ON s.brand_id = b.id
    JOIN materials m ON s.material_id = m.id
    JOIN colors col ON s.color_id = col.id
    ${query}
    ORDER BY id
    LIMIT ${limitParam} OFFSET ${offsetParam}`,
    [...params, limit, offset]
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
      c_g.gender,
      s.season,
      c_g.category_id,
      c.name AS category_name,
      s.brand_id,
      b.name AS brand_name,
      s.material_id,
      m.name AS material_name,
      s.color_id,
      col.name AS color_name
    FROM shoes s
    JOIN category_gender c_g ON s.category_gender_id = c_g.id
    JOIN categories c ON c_g.category_id = c.id
    JOIN brands b ON s.brand_id = b.id
    JOIN materials m ON s.material_id = m.id
    JOIN colors col ON s.color_id = col.id
    WHERE s.id = $1`,
    [id]
  );

  return rows[0];
}

async function getGenderCategoryId(
  gender: Shoe["gender"],
  categoryId: Shoe["categoryId"]
): Promise<{ id: number } | null> {
  const { rows } = await pool.query(
    `SELECT id
    FROM category_gender
    WHERE gender = $1 AND category_id = $2`,
    [gender, categoryId]
  );

  return rows[0] ?? null;
}

async function createShoeQuery({
  season,
  genderCategoryId,
  brandId,
  materialId,
  colorId,
}: ShoeBodyMutation): Promise<ShoeListItemDto> {
  const { rows: idColumn } = await pool.query(
    `INSERT INTO shoes (season, category_gender_id, brand_id, material_id, color_id) 
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id;`,
    [season, genderCategoryId, brandId, materialId, colorId]
  );

  const id = idColumn[0].id;
  const { rows } = await pool.query(`SELECT * FROM view_shoes WHERE id = $1`, [
    id,
  ]);

  return rows[0];
}

async function updateShoeQuery(
  id: ShoeId,
  shoeData: ShoeBodyMutation
): Promise<ShoeListItemDto> {
  const { season, genderCategoryId, brandId, materialId, colorId } = shoeData;
  await pool.query(
    `UPDATE shoes 
    SET
      season = $1,
      category_gender_id = $2,
      brand_id = $3,
      material_id = $4,
      color_id = $5
    WHERE id = $6;`,
    [season, genderCategoryId, brandId, materialId, colorId, id]
  );

  const { rows } = await pool.query(`SELECT * FROM view_shoes WHERE id = $1`, [
    id,
  ]);

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
  getGenderCategoryId,
  createShoeQuery,
  updateShoeQuery,
  deleteShoeQuery,
};
