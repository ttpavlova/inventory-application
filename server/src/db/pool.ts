import { Pool } from "pg";
import config from "../config/config.js";

const { roleName, rolePassword, dbHost, dbPort, dbName } = config.db;

const pool = new Pool({
  connectionString: `postgresql://${roleName}:${rolePassword}@${dbHost}:${dbPort}/${dbName}`,
});

export { pool };
