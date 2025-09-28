import { NextResponse } from "next/server";
import { ZodError } from "zod";

export default {
    success(data: any, message= "Success", status= 200) {
        return NextResponse.json({
            status,
            message,
            data
        },{
            status,
            statusText: message
        })
    },
    error(error: unknown, message= "error", status= 400) {

        if (error instanceof ZodError) {
            return NextResponse.json({
                status,
                message,
                error: error.issues.map((issue) => ({
                    path: issue.path[0],
                    message: issue.message
                }))
            },
            {
                status,
                statusText: message
            }
        )
        }
        return NextResponse.json({
            status,
            message,
            error
        },{
            status,
            statusText: message,
        });
    },
    unauthorized(message= "Unauthorized", status= 401) {
        return NextResponse.json({
            status,
            message,
            data: []
        },{
            status,
            statusText: message,
        });
    },
    notFound(status= 404, message= "Not Found") {
        return NextResponse.json({
            status,
            message,
            data: []
        })
    }
}