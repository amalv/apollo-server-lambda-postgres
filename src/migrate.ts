import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, client } from "./db";

(async () => {
  await migrate(db, { migrationsFolder: "./drizzle" });
  await client.end();
})();
