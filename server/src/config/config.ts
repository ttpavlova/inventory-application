import dotenv from "dotenv";
dotenv.config();

type nodeEnvType = "production" | "development";

interface AppConfig {
  port: number;
  nodeEnv: nodeEnvType;
}

interface DatabaseConfig {
  dbUrl: string;
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
    port: parseInt(process.env.PORT || "5000"),
    nodeEnv: (process.env.NODE_ENV as nodeEnvType) || "development",
  },
  db: {
    dbUrl: getRequiredEnv("DATABASE_URL"),
  },
};

export default config;
