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
    // https://nextjs.org/docs/advanced-features/security-headers
    headers: async () => [
        {
            source: "/:path*",
            headers: [
                {
                    key: "Strict-Transport-Security",
                    value: "max-age=63072000; includeSubDomains; preload",
                },
                {
                    key: "Cross-Origin-Opener-Policy",
                    value: "same-origin",
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
                    value: "strict-origin-when-cross-origin",
                },
                {
                    key: "Content-Security-Policy",
                    value: `
                                default-src 'self';
                                form-action 'self'; 
                                object-src 'none';
                                img-src 'self' https: data:${process.env.NODE_ENV === "development" ? " http:" : ""};
                                media-src 'self' https: data:${process.env.NODE_ENV === "development" ? " http:" : ""};
                                style-src 'self' 'unsafe-inline'; 
                                font-src 'self' https: data:;
                                script-src 'self' 'unsafe-inline' https:${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""};
                                connect-src 'self' https:${process.env.NODE_ENV === "development" ? " http:" : ""};
                                frame-ancestors ${process.env.ADMIN_URL};
                                upgrade-insecure-requests; 
                                block-all-mixed-content;
                                frame-src 'self' https://*.youtube.com https://*.youtube-nocookie.com;
                            `
                        .replace(/\s{2,}/g, " ")
                        .trim(),
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
