CREATE TABLE IF NOT EXISTS "beans" (
	"id" serial PRIMARY KEY NOT NULL,
	"bean_name" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "blends" (
	"id" serial PRIMARY KEY NOT NULL,
	"blend_name" varchar(256) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" varchar PRIMARY KEY NOT NULL,
	"customer_name" varchar(256),
	"supplier_name" varchar(256),
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders_products" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" varchar,
	"product_id" varchar,
	"amount_ordered" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" varchar PRIMARY KEY NOT NULL,
	"product_name" varchar(256) NOT NULL,
	"sku" varchar(256),
	"price" double precision,
	"possibly_coffee" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_name" varchar(256)
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders_products" ADD CONSTRAINT "orders_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
