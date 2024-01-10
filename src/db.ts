import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schema";

const envPaths = {
  production: ".env.production",
  staging: ".env.staging",
  development: ".env.local",
};

const envPath = envPaths[process.env.NODE_ENV] || ".env.local";

config({ path: envPath });

export const client = new Client({
  host: process.env.DB_ENDPOINT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

(async () => {
  await client.connect();
})();

export const db = drizzle(client, { schema });
