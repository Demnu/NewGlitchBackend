ALTER TABLE "calculations" ADD COLUMN "author" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "calculations" ADD COLUMN "calculationName" varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE "calculations" ADD COLUMN "created_at" timestamp with time zone NOT NULL;