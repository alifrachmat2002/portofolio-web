import { db } from "@/db";
import { TechstackInsert, techstackSchema, techstacksTable } from "@/db/schema/techstacks";
import { auth } from "@/lib/auth";
import response from "@/lib/response";
import { headers } from "next/headers";

export async function GET() {
  try {
    const data = await db
                    .select()
                    .from(techstacksTable)
                    .orderBy(techstacksTable.id);

    return response.success(data,"Techstack Retrieved Successfully")
  } catch (error) {
    return response.error(error)
  }   
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return response.unauthorized();
    
    const payload = await req.json() as TechstackInsert;
    const validatedData = techstackSchema.parse(payload);

    const result = await db
                      .insert(techstacksTable)
                      .values(validatedData)
                      .returning();

    return response.success(result, "Techstack Added Successfully!")

  } catch (error) {
    return response.error(error)
  }
}