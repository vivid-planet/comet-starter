/* eslint-disable */

// @ts-check
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const cometConfig = require("./src/comet-config.json");

/**
 * @type {import('next').NextConfig['i18n'] | undefined}
 **/
let i18n = undefined;

if (process.env.NEXT_PUBLIC_SITE_IS_PREVIEW !== "true") {
    if (!process.env.NEXT_PUBLIC_SITE_LANGUAGES) {
        throw new Error("Missing environment variable NEXT_PUBLIC_SITE_LANGUAGES");
    }

    if (!process.env.NEXT_PUBLIC_SITE_DEFAULT_LANGUAGE) {
        throw new Error("Missing environment variable NEXT_PUBLIC_SITE_DEFAULT_LANGUAGE");
    }

    i18n = {
        locales: process.env.NEXT_PUBLIC_SITE_LANGUAGES.split(","),
        defaultLocale: process.env.NEXT_PUBLIC_SITE_DEFAULT_LANGUAGE,
        localeDetection: process.env.NODE_ENV === "development" ? false : undefined,
    };
}

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
    pageExtensions: ["page.ts", "page.tsx"],
    cleanDistDir: process.env.NODE_ENV !== "production", // sitemap and robots.txt are pre-existing
    basePath: process.env.NEXT_PUBLIC_SITE_IS_PREVIEW === "true" ? "/site" : "",
    rewrites: async () => {
        if (process.env.NEXT_PUBLIC_SITE_IS_PREVIEW === "true") return [];
        var rewrites = await require("./preBuild/build/preBuild/src/createRewrites").createRewrites();
        return rewrites;
    },
    redirects: async () => {
        if (process.env.NEXT_PUBLIC_SITE_IS_PREVIEW === "true") return [];
        var redirects = await require("./preBuild/build/preBuild/src/createRedirects").createRedirects();
        return redirects;
    },
    images: cometConfig.images,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        var path = require("path");

        config.resolve.alias["@src"] = path.resolve(__dirname, "src/");

        return config;
    },
    i18n,
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
                    key: "Content-Security-Policy",
                    value: [
                        "default-src 'none'",
                        "script-src-elem 'self'",
                        "style-src-elem 'unsafe-inline'",
                        "style-src-attr 'unsafe-inline'",
                        `img-src 'self' data: ${process.env.API_URL}/`,
                        "script-src 'unsafe-eval'",
                        "connect-src 'self'",
                        "frame-src https://www.youtube-nocookie.com",
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
                    // This value should be set to "require-corp" as soon as iframe credentialless it is supported by all browsers
                    // https://developer.mozilla.org/en-US/docs/Web/Security/IFrame_credentialless
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
                {
                    key: "Access-Control-Allow-Origin",
                    value: "none",
                },
            ],
        },
    ],
};

module.exports = withBundleAnalyzer(nextConfig);
