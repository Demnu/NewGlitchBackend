ALTER TABLE "recipes" ADD COLUMN "blend_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipes" ADD CONSTRAINT "recipes_blend_id_blends_id_fk" FOREIGN KEY ("blend_id") REFERENCES "blends"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "recipes" DROP COLUMN IF EXISTS "blend_name";