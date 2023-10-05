DROP TABLE "orders_products";--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "orderId" varchar;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_orderId_unique" UNIQUE("orderId");