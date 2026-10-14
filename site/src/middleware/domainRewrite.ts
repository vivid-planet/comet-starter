import { type Middleware, MiddlewareResponse } from "@src/framework/server/middleware";
import { getHostByHeaders, getSiteConfigForHost } from "@src/util/siteConfig";
import { getSitePreviewParams } from "@src/util/sitePreview";
import type { VisibilityParam } from "@src/util/visibility";

/**
 * Rewrite request to include the matching domain (from http host) and the visibility in the path, so the route gets them as params.
 */
export function withDomainRewriteMiddleware(middleware: Middleware): Middleware {
    return async (request) => {
        const host = getHostByHeaders(request.headers);
        const siteConfig = await getSiteConfigForHost(host);
        if (!siteConfig) {
            throw new Error(`Cannot get siteConfig for host ${host}`);
        }

        const preview = await getSitePreviewParams();
        let visibilityParam: VisibilityParam = "default";
        if (preview?.previewData) {
            visibilityParam = preview.previewData.includeInvisible ? "invisibleBlocks" : "invisiblePages";
        }

        const { pathname, search } = new URL(request.url);
        return MiddlewareResponse.rewrite(
            new URL(`/${visibilityParam}/${siteConfig.scope.domain}${pathname === "/" ? "" : pathname}${search}`, request.url),
        );
    };
}
