DO $$ BEGIN
 CREATE TYPE "order_status" AS ENUM('notCalculated', 'calculated');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "order_status" "order_status";