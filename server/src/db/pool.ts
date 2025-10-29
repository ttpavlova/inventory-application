import {
  role_name,
  role_password,
  db_name,
  db_port,
  db_host,
} from "./const.js";
import { Pool } from "pg";

module.exports = new Pool({
  connectionString: `postgresql://${role_name}:${role_password}@${db_host}:${db_port}/${db_name}`,
});
