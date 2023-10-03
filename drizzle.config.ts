import type { Config } from "drizzle-kit";
import 'dotenv/config'
import { MigrationConfig } from "drizzle-orm/migrator";

export default {
  schema: "./src/db/schema",
  out: "./src/db/migrations/",
  driver:'pg',
  dbCredentials:{connectionString: process.env.CONNECTION_STRING || ""}
} satisfies Config;

export const migrationConfig: MigrationConfig = {
  migrationsFolder: './src/db/migrations/'
};