import { getSiteConfigForRequest } from "@src/util/siteConfig";
import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = async (context) => {
    const siteConfig = await getSiteConfigForRequest(context.request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const sitemapURL = new URL('sitemap.xml', siteConfig.url);
    return new Response(getRobotsTxt(sitemapURL));
};
