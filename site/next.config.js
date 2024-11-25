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
    // https://nextjs.org/docs/advanced-features/security-headers (Content-Security-Policy and CORS are set in middleware.ts)
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
            ],
        },
    ],
    cacheHandler: process.env.REDIS_ENABLED === "true" ? require.resolve("./dist/cache-handler.js") : undefined,
    cacheMaxMemorySize: process.env.REDIS_ENABLED === "true" ? 0 : undefined, // disable default in-memory caching
};

module.exports = withBundleAnalyzer(nextConfig);
