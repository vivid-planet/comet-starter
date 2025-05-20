import { withAdminRedirectMiddleware } from "./middleware/adminRedirect";
import { chain } from "./middleware/chain";
import { withContentSecurityPolicyHeadersMiddleware } from "./middleware/contentSecurityPolicyHeaders";
import { withDamRewriteMiddleware } from "./middleware/damRewrite";
import { withDomainRewriteMiddleware } from "./middleware/domainRewrite";
import { withPreviewMiddleware } from "./middleware/preview";
import { withRedirectToMainHostMiddleware } from "./middleware/redirectToMainHost";
import { withRobotsMiddleware } from "./middleware/robots";
import { withStatusMiddleware } from "./middleware/status";

export default chain([
    withStatusMiddleware,
    withAdminRedirectMiddleware,
    withDamRewriteMiddleware,
    withContentSecurityPolicyHeadersMiddleware,
    withPreviewMiddleware,
    withRedirectToMainHostMiddleware,
    withRobotsMiddleware,
    withDomainRewriteMiddleware, // must be last (rewrites all urls)
]);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, icon.svg, apple-icon.png
         * - manifest.json
         * - assets (assets from /public folder)
         */
        "/((?!_next/static|_next/image|favicon.ico|icon.svg|apple-icon.png|manifest.json|assets/).*)",
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
