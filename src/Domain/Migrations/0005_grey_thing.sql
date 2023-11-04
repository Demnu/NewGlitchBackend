ALTER TABLE "beans" ALTER COLUMN "bean_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "customer_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "supplier_name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "updated_at" SET NOT NULL;