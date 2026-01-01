import { Pool } from "pg";
import config from "../config/config.js";

const { dbUrl } = config.db;

const pool = new Pool({
  connectionString: dbUrl,
});

export { pool };
