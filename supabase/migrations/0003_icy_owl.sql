ALTER TABLE "projects" ADD COLUMN "tech_stack" text[] DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "images" text[] DEFAULT '{}';--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "year" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "repo_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "isHidden" boolean DEFAULT false;