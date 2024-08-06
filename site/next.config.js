/* eslint-disable */

// @ts-check
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const cometConfig = require("./src/comet-config.json");
const { type } = require("os");

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
                        "default-src 'none'",
                        "script-src-elem 'self'",
                        "style-src-elem 'unsafe-inline'",
                        "style-src-attr 'unsafe-inline'",
                        `img-src 'self' data: ${process.env.API_URL}/`,
                        "script-src 'unsafe-eval'",
                        "connect-src 'self'",
                        `frame-src https://www.youtube-nocookie.com; ${!process.env.DEV_DOMAIN ? "upgrade-insecure-requests" : ""}`, // Don't use upgrade-insecure-requests with the Domain-Setup
                    ].join("; "),
                },
                {
                    key: "Strict-Transport-Security",
                    value: "max-age=63072000; includeSubDomains; preload",
                },
                {
                    key: "Cross-Origin-Opener-Policy",
                    value: "same-origin",
                },
                {
                    key: "Cross-Origin-Embedder-Policy",
                    // This value should be set to 'require-corp' as soon as iframe credentialless is supported by all browsers
                    // https://developer.mozilla.org/en-US/docs/Web/Security/IFrame_credentialless
                    // https://caniuse.com/mdn-html_elements_iframe_credentialless
                    value: "unsafe-none",
                },
                {
                    key: "Cross-Origin-Resource-Policy",
                    value: "same-site",
                },
                {
                    key: "Permissions-Policy",
                    value: "",
                },
                {
                    key: "X-Content-Type-Options",
                    value: "nosniff",
                },
                {
                    key: "Referrer-Policy",
                    value: "same-origin",
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
