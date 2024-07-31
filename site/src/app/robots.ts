import { getSiteConfigs } from "@src/config";
import { MetadataRoute } from "next";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const siteConfigs = getSiteConfigs();

    const sitemaps: string[] = [];
    for (const siteConfig of siteConfigs) {
        sitemaps.push(`${siteConfig.url}/sitemap.xml`);
    }

    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: sitemaps,
    };
}
