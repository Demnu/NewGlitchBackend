import type { Config } from "drizzle-kit";
import 'dotenv/config'
import { MigrationConfig } from "drizzle-orm/migrator";


export default {
  schema: "./src/Domain/Entities",
  out: "./src/Domain/Migrations",
  driver:'pg',
  dbCredentials:{connectionString: process.env.CONNECTION_STRING || ""}
} satisfies Config;

export const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/Domain/Migrations"
};

