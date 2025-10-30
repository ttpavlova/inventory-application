import dotenv from "dotenv";
dotenv.config();

type nodeEnvType = "production" | "development";

interface AppConfig {
  port: number;
  nodeEnv: nodeEnvType;
}

interface DatabaseConfig {
  roleName: string;
  rolePassword: string;
  dbName: string;
  dbPort: number;
  dbHost: string;
}

interface Config {
  app: AppConfig;
  db: DatabaseConfig;
}

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const config: Config = {
  app: {
    port: Number(process.env.PORT) || 5000,
    nodeEnv: (process.env.NODE_ENV as nodeEnvType) || "development",
  },
  db: {
    roleName: getRequiredEnv("DB_USER"),
    rolePassword: getRequiredEnv("DB_PASSWORD"),
    dbName: getRequiredEnv("DB_NAME"),
    dbPort: Number(getRequiredEnv("DB_PORT")),
    dbHost: getRequiredEnv("DB_HOST"),
  },
};

export default config;
