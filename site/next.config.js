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
                            `
                        .replace(/\s{2,}/g, " ")
                        .trim(),
                },
                {
                    key: "Access-Control-Allow-Origin",
                    value: process.env.ADMIN_URL,
                },
            ],
        },
    ],
};

module.exports = withBundleAnalyzer(nextConfig);
