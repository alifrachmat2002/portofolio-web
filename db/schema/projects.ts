import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const projectsTable = pgTable("projects", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    shortDescription: text("short_description").notNull(),
    longDescription: text("long_description").notNull(),
});

export type InsertProject = typeof projectsTable.$inferInsert;
export type Project = typeof projectsTable.$inferSelect;
