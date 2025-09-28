import { db } from "@/db";
import { techstacksTable } from "@/db/schema/techstacks";
import { auth } from "@/lib/auth";
import response from "@/lib/response";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest,{params} : {params : Promise<{ id: string }>}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return response.unauthorized();

    const { id } = await params;

    const result = await db
        .delete(techstacksTable)
        .where(eq(techstacksTable.id, Number(id)))
        .returning()

    return response.success(result, "Techstack Deleted Successfully")

  } catch (error) {
    return response.error(error, "An Error Occured when deleting Techstack");
    
  }
  
}