import { robotsResponse } from "@src/framework/metadataRoutes";
import { getSiteConfig } from "@src/util/siteConfig";

export async function robots() {
    const siteConfig = await getSiteConfig();

    return robotsResponse({
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${siteConfig.url}/sitemap.xml`,
    });
}
