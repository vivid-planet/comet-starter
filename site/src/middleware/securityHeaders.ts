import type { Middleware } from "@src/framework/server/middleware";

// See https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers (previously configured via `headers` in next.config.mjs, Content-Security-Policy and CORS are set in contentSecurityPolicyHeaders.ts)
const securityHeaders = {
    "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload", // 2 years (recommended when subdomains are included)
    "Cross-Origin-Opener-Policy": "same-origin", // Only allow the same origin to open the page in a browsing context
    // This value should be set to 'require-corp' as soon as iframe credentialless is supported by all browsers
    // https://developer.mozilla.org/en-US/docs/Web/Security/IFrame_credentialless
    // https://caniuse.com/mdn-html_elements_iframe_credentialless
    "Cross-Origin-Embedder-Policy": "unsafe-none",
    "Cross-Origin-Resource-Policy": "same-site", // Do not allow cross-origin requests to access the response
    "Permissions-Policy": "",
    "X-Content-Type-Options": "nosniff", // Prevent MIME sniffing
    // This should be changed when using web analytics tools. For example, use "strict-origin-when-cross-origin" for Google Analytics
    "Referrer-Policy": "same-origin", // Only use referer on own domain.
};

export function withSecurityHeadersMiddleware(middleware: Middleware): Middleware {
    return async (request) => {
        const response = await middleware(request);
        for (const [key, value] of Object.entries(securityHeaders)) {
            response.headers.set(key, value);
        }
        return response;
    };
}
