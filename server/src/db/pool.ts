import {
  getRoleName,
  getRolePassword,
  getDbName,
  getDbPort,
  getDbHost,
} from "./const.js";
import { Pool } from "pg";

module.exports = new Pool({
  connectionString: `postgresql://${getRoleName()}:${getRolePassword()}@${getDbHost()}:${getDbPort()}/${getDbName()}`,
});
