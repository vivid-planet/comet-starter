import { getHost, getSiteConfigForDomain } from "@src/config";
import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const siteConfig = getSiteConfigForDomain(getHost(headers()));

    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    };
}
