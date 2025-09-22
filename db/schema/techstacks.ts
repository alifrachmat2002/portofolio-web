import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const techstacksTable = pgTable('techstacks',{
    id: serial('id').primaryKey(),
    name: text('name').notNull()
});

export type Techstack = typeof techstacksTable.$inferSelect;
export type TechstackInsert = typeof techstacksTable.$inferInsert;
