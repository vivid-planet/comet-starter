/* eslint-disable */

// @ts-check
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const cometConfig = require("./src/comet-config.json");

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    images: cometConfig.images,
    typescript: {
        ignoreBuildErrors: process.env.NODE_ENV === "production",
    },
    eslint: {
        ignoreDuringBuilds: process.env.NODE_ENV === "production",
    },
    compiler: {
        styledComponents: true,
    },
    experimental: {
        optimizePackageImports: ["@comet/cms-site"],
    },
    poweredByHeader: false,
    // https://nextjs.org/docs/advanced-features/security-headers
    headers: async () => [
        {
            source: "/:path*",
            headers: [
                {
                    key: "Content-Security-Policy",
                    value: [
                        "default-src 'self'", // Needed for svgs to work in Firefox (other browsers load svgs with img-src)
                        "style-src-elem 'self' 'unsafe-inline'",
                        "style-src-attr 'unsafe-inline'",
                        "script-src-elem 'self' 'unsafe-inline'",
                        `${process.env.NODE_ENV === "development" ? "script-src 'unsafe-eval'" : ""}`, // Needed in local development
                        `${process.env.NODE_ENV === "development" ? "connect-src ws:" : ""}`, // Used for hot reloading in local development
                        "font-src data:",
                        "frame-src https://www.youtube-nocookie.com/",
                        `img-src data: 'self' ${process.env.NODE_ENV === "development" ? process.env.API_URL + "/" : ""}`,
                        `${process.env.NODE_ENV === "development" ? "" : "upgrade-insecure-requests"}`, // Don't use upgrade-insecure-requests with the Domain-Setup
                    ].join("; "),
                },
                {
                    key: "Strict-Transport-Security", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
                    value: "max-age=63072000; includeSubDomains; preload", // 2 years (recommended when subdomains are included)
                },
                {
                    key: "Cross-Origin-Opener-Policy", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy
                    value: "same-origin", // Only allow the same origin to open the page in a browsing context
                },
                {
                    key: "Cross-Origin-Embedder-Policy",
                    // This value should be set to 'require-corp' as soon as iframe credentialless is supported by all browsers
                    // https://developer.mozilla.org/en-US/docs/Web/Security/IFrame_credentialless
                    // https://caniuse.com/mdn-html_elements_iframe_credentialless
                    value: "unsafe-none",
                },
                {
                    key: "Cross-Origin-Resource-Policy", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy
                    value: "same-site", // Do not allow cross-origin requests to access the response
                },
                {
                    //
                    key: "Permissions-Policy", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Permissions_Policy
                    value: "",
                },
                {
                    key: "X-Content-Type-Options", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
                    value: "nosniff", // Prevent MIME sniffing
                },
                {
                    // This should be changed when using web analytics tools. For example, use "strict-origin-when-cross-origin" for Google Analytics
                    key: "Referrer-Policy", // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
                    value: "same-origin", // Only use referer on own domain.
                },
                ...(process.env.ADMIN_URL
                    ? [
                          {
                              key: "Access-Control-Allow-Origin",
                              value: process.env.ADMIN_URL,
                          },
                      ]
                    : []),
            ],
        },
    ],
};

module.exports = withBundleAnalyzer(nextConfig);
