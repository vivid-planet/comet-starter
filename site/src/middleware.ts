import { withAdminRedirectMiddleware } from "./middleware/adminRedirect";
import { chain } from "./middleware/chain";
import { withCspHeadersMiddleware } from "./middleware/cspHeaders";
import { withDamRewriteMiddleware } from "./middleware/damRewrite";
import { withDomainRewriteMiddleware } from "./middleware/domainRewrite";
import { withPreviewMiddleware } from "./middleware/preview";
import { withRedirectToMainHostMiddleware } from "./middleware/redirectToMainHost";
import { withSitePreviewMiddleware } from "./middleware/sitePreview";

export default chain([
    withSitePreviewMiddleware,
    withRedirectToMainHostMiddleware,
    withAdminRedirectMiddleware,
    withDamRewriteMiddleware,
    withCspHeadersMiddleware, // order matters: after redirects (that don't need csp headers), before everything else that needs csp headers
    withPreviewMiddleware,
    withDomainRewriteMiddleware, // must be last (rewrites all urls)
]);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, icon.svg, apple-icon.png
         * - manifest.json
         * - assets (assets from /public folder)
         * - robots.txt
         */
        "/((?!api|_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest.json|assets|robots.txt).*)",
    ],
    // TODO find a better solution for this (https://nextjs.org/docs/messages/edge-dynamic-code-evaluation)
    unstable_allowDynamic: [
        "/node_modules/graphql/**",
        /*
         * cache-manager uses lodash.clonedeep which uses dynamic code evaluation.
         * See https://github.com/lodash/lodash/issues/5525.
         */
        "/node_modules/lodash.clonedeep/**",
    ],
};
