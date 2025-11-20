import type { Filter } from "../types/types.js";
import { pool } from "./pool.js";

async function getAllBrandsQuery(): Promise<Filter[]> {
  const { rows } = await pool.query("SELECT * FROM brands");

  return rows;
}

async function getAllMaterialsQuery(): Promise<Filter[]> {
  const { rows } = await pool.query("SELECT * FROM materials");

  return rows;
}

async function getAllColorsQuery(): Promise<Filter[]> {
  const { rows } = await pool.query("SELECT * FROM colors");

  return rows;
}

export { getAllBrandsQuery, getAllMaterialsQuery, getAllColorsQuery };
