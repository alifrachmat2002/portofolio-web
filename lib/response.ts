import { NextResponse } from "next/server";

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
    error(error: Error | any, message= "error", status= 400) {
        
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