import { config } from "dotenv";
import type { Config } from "drizzle-kit";

const envPaths = {
  production: ".env.production",
  staging: ".env.staging",
  development: ".env.local",
};

const envPath = envPaths[process.env.NODE_ENV] || ".env.local";

config({ path: envPath });

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: process.env.DB_ENDPOINT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
} satisfies Config;
