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
    poweredByHeader: false,
    // https://nextjs.org/docs/advanced-features/security-headers (Content-Security-Policy and CORS are set in middleware.ts/configureResponse.ts)
    headers: async () => [
        {
            source: "/:path*",
            headers: [
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
            ],
        },
    ],
    cacheHandler: process.env.REDIS_ENABLED === "true" ? require.resolve("./dist/cache-handler.js") : undefined,
    cacheMaxMemorySize: process.env.REDIS_ENABLED === "true" ? 0 : undefined, // disable default in-memory caching
};

export default withBundleAnalyzer(nextConfig);
