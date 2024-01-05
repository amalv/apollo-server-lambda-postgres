import { config } from "dotenv";
import type { Config } from "drizzle-kit";

const envPath =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";

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
