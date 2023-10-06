ALTER TABLE "orders" ALTER COLUMN "customer_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "supplier_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "updated_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "product_id" varchar(256);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "sku" varchar(256);--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "price" double precision;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_product_id_unique" UNIQUE("product_id");