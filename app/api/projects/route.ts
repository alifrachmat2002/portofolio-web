import { db } from "@/db";
import { projectsTable } from "@/db/schema/projects";
import { auth } from "@/lib/auth";
import response from "@/lib/response";
import { and, desc, eq, SQL } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        const searchParams = req.nextUrl.searchParams;
        const isHidden = Boolean(searchParams.get("isHidden"));
        const session = await auth.api.getSession({
            headers: await headers()
        });

        const filters: SQL[] = [];
        filters.push(eq(projectsTable.isHidden, session ? isHidden : false));

        const projects = await db
            .select()
            .from(projectsTable)
            .orderBy(desc(projectsTable.createdAt))
            .where(and(...filters));
    
        return response.success(projects, "Projects Retrieved Successfully")
    } catch (error) {
        return response.error(error)
    }
};