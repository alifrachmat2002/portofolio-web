import { pgTable, serial, text } from "drizzle-orm/pg-core";
import z from "zod";

export const techstacksTable = pgTable('techstacks',{
    id: serial('id').primaryKey(),
    name: text('name').notNull()
});

export type Techstack = typeof techstacksTable.$inferSelect;
export type TechstackInsert = typeof techstacksTable.$inferInsert;

export const techstackSchema = z.object({
    name: z.string().min(2).max(100),
});

export type TechstackForm = z.infer<typeof techstackSchema>;
