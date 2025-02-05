import { getHostByHeaders, getSiteConfigForHost, getSiteConfigs } from "@src/util/siteConfig";
import { NextRequest, NextResponse } from "next/server";

import { CustomMiddleware } from "./chain";

/**
 * When http host isn't siteConfig.domains.main (instead .pattern or .additional match), redirect to main host.
 */
export function withRedirectToMainHostMiddleware(middleware: CustomMiddleware) {
    return async (request: NextRequest) => {
        const headers = request.headers;
        const host = getHostByHeaders(headers);
        const siteConfig = await getSiteConfigForHost(host);

        if (!siteConfig) {
            // Redirect to Main Host
            const redirectSiteConfig = getSiteConfigs().find(
                (siteConfig) =>
                    siteConfig.domains.additional?.includes(host) ||
                    (siteConfig.domains.pattern && host.match(new RegExp(siteConfig.domains.pattern))),
            );
            if (redirectSiteConfig) {
                return NextResponse.redirect(redirectSiteConfig.url);
            }

            return new NextResponse(null, { status: 404 });
        }
        return middleware(request);
    };
}
