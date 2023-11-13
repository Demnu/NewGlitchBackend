ALTER TABLE "calculations" ADD COLUMN "beans_tally" json NOT NULL;--> statement-breakpoint
ALTER TABLE "calculations" ADD COLUMN "products_tally" json NOT NULL;--> statement-breakpoint
ALTER TABLE "calculations" ADD COLUMN "orders_calculated_info" json NOT NULL;--> statement-breakpoint
ALTER TABLE "calculations" DROP COLUMN IF EXISTS "calculation";