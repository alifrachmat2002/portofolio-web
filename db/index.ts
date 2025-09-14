import { ENVIRONMENT } from "@/lib/env";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js"

const client = postgres(ENVIRONMENT.DATABASE_URL);
export const db = drizzle(client);