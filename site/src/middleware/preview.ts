import { NextRequest, NextResponse } from "next/server";

import { CustomMiddleware } from "./chain";

/**
 * /block-preview/* and /site-preview must not use the domain rewrite, because we don't have a active domain. This middleware exists the chain in that case.
 */
export function withPreviewMiddleware(middleware: CustomMiddleware) {
    return async (request: NextRequest) => {
        if (request.nextUrl.pathname.startsWith("/block-preview/") || request.nextUrl.pathname === "/site-preview") {
            // don't apply any other middlewares
            return NextResponse.next();
        }
        return middleware(request);
    };
}
