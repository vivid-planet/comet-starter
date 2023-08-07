/* eslint-disable */

// @ts-check

const cometConfig = require("./comet-config.json");

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
    pageExtensions: ["page.ts", "page.tsx"],
    cleanDistDir: process.env.NODE_ENV !== "production", // sitemap and robots.txt are pre-existing
    basePath: process.env.SITE_IS_PREVIEW === "true" ? "/site" : "",
    redirects: async () => {
        if (process.env.SITE_IS_PREVIEW === "true") return [];
        var redirects = await require("./preBuild/build/preBuild/src/createRedirects").createRedirects();
        return redirects;
    },
    images: {
        deviceSizes: cometConfig.dam.allowedImageSizes,
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        var path = require("path");

        config.resolve.alias["@src"] = path.resolve(__dirname, "src/");

        return config;
    },
    i18n: {
        locales: process.env.NEXT_PUBLIC_SITE_LANGUAGES.split(","),
        defaultLocale: process.env.NEXT_PUBLIC_SITE_DEFAULT_LANGUAGE,
        localeDetection: process.env.NODE_ENV !== "development",
    },
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
                    key: "X-DNS-Prefetch-Control",
                    value: "on",
                },
                {
                    key: "Strict-Transport-Security",
                    value: "max-age=63072000; includeSubDomains; preload",
                },
                {
                    key: "X-XSS-Protection",
                    value: "1; mode=block",
                },
                {
                    key: "X-Frame-Options",
                    value: "SAMEORIGIN",
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
                                default-src 'self' https:;
                                img-src 'self' https: data:${process.env.NODE_ENV === "development" ? " http:" : ""};
                                media-src 'self' https: data:${process.env.NODE_ENV === "development" ? " http:" : ""};
                                style-src 'self' 'unsafe-inline'; 
                                font-src 'self' https: data:;
                                script-src 'self' 'unsafe-inline' https:${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""};
                                connect-src 'self' https:${process.env.NODE_ENV === "development" ? " http:" : ""};
                                frame-ancestors ${process.env.ADMIN_URL};
                            `
                        .replace(/\s{2,}/g, " ")
                        .trim(),
                },
            ],
        },
    ],
};
