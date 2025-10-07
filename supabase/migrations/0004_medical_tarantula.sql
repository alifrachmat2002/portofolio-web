ALTER TABLE "projects" ALTER COLUMN "year" SET DATA TYPE varchar(4);--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "repo_url" SET DATA TYPE varchar(500);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "updated_at" timestamp DEFAULT now();