import dotenv from "dotenv";

dotenv.config();

type nodeEnvType = "production" | "development";

interface Config {
  port: number;
  nodeEnv: nodeEnvType;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: (process.env.NODE_ENV as nodeEnvType) || "development",
};

export default config;
