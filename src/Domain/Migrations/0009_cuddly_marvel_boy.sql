DO $$ BEGIN
 CREATE TYPE "log_level" AS ENUM('emergency', 'alert', 'critical', 'error', 'warning', 'notice', 'informational', 'debug');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"log_level" "log_level" NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	"message" varchar(256) NOT NULL
);
