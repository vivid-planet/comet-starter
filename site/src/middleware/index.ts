import { chain } from "@src/framework/server/middleware";

import { withAdminRedirectMiddleware } from "./adminRedirect";
import { withContentSecurityPolicyHeadersMiddleware } from "./contentSecurityPolicyHeaders";
import { withDamRewriteMiddleware } from "./damRewrite";
import { withDomainRewriteMiddleware } from "./domainRewrite";
import { withHealthcheckMiddleware } from "./healthcheck";
import { withPreviewMiddleware } from "./preview";
import { withRedirectToMainHostMiddleware } from "./redirectToMainHost";
import { withRobotsMiddleware } from "./robots";
import { withSecurityHeadersMiddleware } from "./securityHeaders";
import { withStaticFilesMiddleware } from "./staticFiles";

export const middleware = chain([
    withSecurityHeadersMiddleware,
    withHealthcheckMiddleware,
    withAdminRedirectMiddleware,
    withStaticFilesMiddleware,
    withDamRewriteMiddleware,
    withContentSecurityPolicyHeadersMiddleware,
    withPreviewMiddleware,
    withRedirectToMainHostMiddleware,
    withRobotsMiddleware, // for robots.txt, the middleware may only be skipped after the main host redirect
    withDomainRewriteMiddleware, // must be last (rewrites all urls)
]);
