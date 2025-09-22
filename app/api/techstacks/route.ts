import { db } from "@/db";
import { techstacksTable } from "@/db/schema/techstacks";
import { auth } from "@/lib/auth";
import response from "@/lib/response";
import { headers } from "next/headers";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) return response.unauthorized();


    const data = await db
                    .select()
                    .from(techstacksTable);

    return response.success(data,"Techstack Retrieved Successfully")
  } catch (error) {
    return response.error(error)
  }
    
}