ALTER TABLE "orders_products" ALTER COLUMN "order_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders_products" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe_beans" ALTER COLUMN "recipe_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe_beans" ALTER COLUMN "bean_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ALTER COLUMN "product_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ALTER COLUMN "product_name" SET NOT NULL;