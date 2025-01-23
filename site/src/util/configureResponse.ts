import { NextResponse } from "next/server";

export function configureResponse(response: NextResponse) {
    setContentSecurityPolicy(response);

    if (process.env.ADMIN_URL) {
        response.headers.set("Access-Control-Allow-Origin", process.env.ADMIN_URL);
    }
    return response;
}

function setContentSecurityPolicy(response: NextResponse) {
    type ContentSecurityPolicyDirective = {
        directive: string;
        values: string[];
    };

    const siteContentSecurityPolicyDirectives: ContentSecurityPolicyDirective[] = [
        { directive: "default-src", values: ["'none'"] }, // Restrict any content not explicitly allowed
        { directive: "style-src-elem", values: ["'self'", "'unsafe-inline'"] },
        { directive: "script-src-elem", values: ["'self'", "'unsafe-inline'"] },
        { directive: "img-src", values: ["'self'", "data:", process.env.API_URL ?? ""] },
        { directive: "style-src-attr", values: ["'unsafe-inline'"] },
        { directive: "font-src", values: ["'self'", "data:"] },
        { directive: "frame-ancestors", values: [process.env.ADMIN_URL ?? "https:"] },
    ];

    const environmentDependentContentSecurityPolicyDirectives: ContentSecurityPolicyDirective[] =
        process.env.NODE_ENV === "development"
            ? [
                  { directive: "script-src", values: ["'unsafe-eval'"] }, // Needed in local development
                  { directive: "connect-src", values: ["ws:"] }, // Used for hot reloading in local development
              ]
            : [{ directive: "upgrade-insecure-requests", values: [] }]; // Upgrade all requests to HTTPS on production

    const contentSecurityPolicyDirectives: ContentSecurityPolicyDirective[] = [
        ...siteContentSecurityPolicyDirectives,
        ...environmentDependentContentSecurityPolicyDirectives,
    ];

    const contentSecurityPolicy = contentSecurityPolicyDirectives
        .map((directive) => `${directive.directive} ${directive.values.join(" ")}`)
        .join("; ");
    response.headers.set("Content-Security-Policy", contentSecurityPolicy);
}
