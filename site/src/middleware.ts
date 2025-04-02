import { withAdminRedirectMiddleware } from "./middleware/adminRedirect";
import { chain } from "./middleware/chain";
import { withContentSecurityPolicyHeadersMiddleware } from "./middleware/contentSecurityPolicyHeaders";
import { withDamRewriteMiddleware } from "./middleware/damRewrite";
import { withDomainRewriteMiddleware } from "./middleware/domainRewrite";
import { withPreviewMiddleware } from "./middleware/preview";
import { withRedirectToMainHostMiddleware } from "./middleware/redirectToMainHost";
import { withSkipMiddleware } from "./middleware/skip";
import { withStatusMiddleware } from "./middleware/status";

export default chain([
    withSkipMiddleware,
    withStatusMiddleware,
    withAdminRedirectMiddleware,
    withDamRewriteMiddleware,
    withContentSecurityPolicyHeadersMiddleware,
    withPreviewMiddleware,
    withRedirectToMainHostMiddleware,
    withDomainRewriteMiddleware, // must be last (rewrites all urls)
]);

export const config = {
    matcher: ["/(.*)"],
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
