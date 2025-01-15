// @ts-check

import nextBundleAnalyzer from "@next/bundle-analyzer";

import cometConfig from "./src/comet-config.json" with { type: "json" };

const withBundleAnalyzer = nextBundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

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
    cacheHandler: process.env.REDIS_ENABLED === "true" ? import.meta.resolve("./dist/cache-handler.js").replace("file://", "") : undefined,
    cacheMaxMemorySize: process.env.REDIS_ENABLED === "true" ? 0 : undefined, // disable default in-memory caching
};

export default withBundleAnalyzer(nextConfig);
