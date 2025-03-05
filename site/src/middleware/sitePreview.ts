import { getHostByHeaders, getSiteConfigForHost } from "@src/util/siteConfig";
import { type NextRequest, NextResponse } from "next/server";

import { type CustomMiddleware } from "./chain";

/**
 * Verify when on site preview domain, a siteConfig exists (by scope set as cookie)
 */
export function withSitePreviewMiddleware(middleware: CustomMiddleware) {
    return async (request: NextRequest) => {
        const host = getHostByHeaders(request.headers);
        const siteConfig = await getSiteConfigForHost(host);
        if (!siteConfig && host === process.env.PREVIEW_DOMAIN) {
            return NextResponse.json({ error: "Preview has to be called from within Comet Web preview" }, { status: 404 });
        }
        return middleware(request);
    };
}
