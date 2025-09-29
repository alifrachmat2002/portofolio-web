import { db } from "@/db";
import { Techstack, TechstackForm, TechstackInsert, techstackSchema, techstacksTable } from "@/db/schema/techstacks";
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
    if (!Number(id))
        return response.error(new Error("Invalid data format provided"));

    const result = await db
        .delete(techstacksTable)
        .where(eq(techstacksTable.id, Number(id)))
        .returning()
      
    if (!result.length) return response.notFound(404, "Techstack not Found")

    return response.success(result[0], "Techstack Deleted Successfully")

  } catch (error) {
    return response.error(error, "An Error Occured when deleting Techstack");
    
  }
  
}

export async function PUT(req: NextRequest, { params }: { params : Promise<{id: string}>}) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) return response.unauthorized()

    const { id }  = await params;
    if (!Number(id)) return response.error(new Error("Invalid data format provided"));

    const payload = await req.json() as TechstackInsert;

    const validatedData = techstackSchema.parse(payload);

    const result = await db
      .update(techstacksTable)
      .set(validatedData)
      .where(eq(techstacksTable.id, Number(id)))
      .returning();

    if (!result.length) return response.notFound(404, "Techstack not Found");

    return response.success(result[0], "Techstack Updated Successfully");
    
  } catch (error) {
    return response.error(error, "An Error Occured when updating Techstack");
  }
}