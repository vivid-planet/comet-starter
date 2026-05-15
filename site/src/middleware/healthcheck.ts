import { type NextRequest, NextResponse } from "next/server";

import { type CustomMiddleware } from "./chain";

export function withHealthcheckMiddleware(middleware: CustomMiddleware) {
    return async (request: NextRequest) => {
        if (["/healthcheck/live", "/healthcheck/ready"].includes(request.nextUrl.pathname)) {
            return NextResponse.json({ status: "OK" }, { headers: { "cache-control": "no-store" } });
        }
        return middleware(request);
    };
}
