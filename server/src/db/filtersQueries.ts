import type { Brand, Color, Material } from "../types/types.js";
import { pool } from "./pool.js";

async function getAllBrandsQuery(): Promise<Brand[]> {
  const { rows } = await pool.query("SELECT * FROM brands");

  return rows;
}

async function getAllMaterialsQuery(): Promise<Material[]> {
  const { rows } = await pool.query("SELECT * FROM materials");

  return rows;
}

async function getAllColorsQuery(): Promise<Color[]> {
  const { rows } = await pool.query("SELECT * FROM colors");

  return rows;
}

export { getAllBrandsQuery, getAllMaterialsQuery, getAllColorsQuery };
