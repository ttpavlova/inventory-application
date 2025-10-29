const getRoleName = () => process.env.DB_USER;
const getRolePassword = () => process.env.DB_PASSWORD;
const getDbName = () => process.env.DB_NAME;
const getDbPort = () => process.env.DB_PORT;
const getDbHost = () => process.env.DB_HOST;

export { getRoleName, getRolePassword, getDbName, getDbPort, getDbHost };
