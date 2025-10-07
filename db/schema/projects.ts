import { boolean, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import z from "zod";

export const projectsTable = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    shortDescription: text("short_description").notNull(),
    longDescription: text("long_description").notNull(),
    techstacks: text("tech_stack").array().default([]),
    images: text("images").array().default([]),
    year: varchar("year", { length : 4 }).notNull(),
    repoUrl: varchar("repo_url", {length: 500}).notNull(),
    isHidden: boolean().default(false),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()    
});

export type InsertProject = typeof projectsTable.$inferInsert;
export type Project = typeof projectsTable.$inferSelect;

export const projectSchema = z.object({
    title: z.string().min(2),
    shortDescription: z.string().min(2),
    longDescription: z.string().min(2),
    techstacks: z.string().min(1,"Techstack name required").array().min(1,"At least one tech stack is required"),
    images: z.string().url("Invalid image URL").array().optional(),
    year: z.number().min(2000).max(new Date().getFullYear()),
    repoUrl: z.string().url(),
    isHidden: z.boolean().optional().default(false)
});

export type ProjectForm = z.infer<typeof projectSchema>;
