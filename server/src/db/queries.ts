import { pool } from "./pool.js";

async function getAllShoes() {
  const { rows } = await pool.query("SELECT * FROM view_shoes");

  return rows;
}

export { getAllShoes };
