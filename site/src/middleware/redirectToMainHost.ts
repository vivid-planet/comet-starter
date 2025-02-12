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

            const response = new NextResponse(
                '<!DOCTYPE html><html lang="en"><head><meta charset=utf-8><title>404</title></head><body>Cannot resolve domain</body></html>',
                {
                    status: 404,
                },
            );
            response.headers.set("Content-Type", "text/html; charset=utf-8");
            return response;
        }
        return middleware(request);
    };
}
