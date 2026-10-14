/**
 * Replacement for the Next.js robots.txt and sitemap.xml file conventions (the subset used by this site).
 */

const cacheControl = "public, max-age=900"; // 15 minutes

type Robots = {
    rules: { userAgent: string; allow?: string; disallow?: string };
    sitemap?: string;
};

export type Sitemap = Array<{
    url: string;
    lastModified?: string | Date;
    changeFrequency?: string;
    priority?: number;
}>;

export function robotsResponse({ rules, sitemap }: Robots): Response {
    const lines = [`User-Agent: ${rules.userAgent}`];
    if (rules.allow) {
        lines.push(`Allow: ${rules.allow}`);
    }
    if (rules.disallow) {
        lines.push(`Disallow: ${rules.disallow}`);
    }
    if (sitemap) {
        lines.push("", `Sitemap: ${sitemap}`);
    }
    return new Response(`${lines.join("\n")}\n`, { headers: { "Content-Type": "text/plain", "Cache-Control": cacheControl } });
}

function escapeXml(value: string) {
    return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export function sitemapResponse(sitemap: Sitemap): Response {
    const urls = sitemap.map(({ url, lastModified, changeFrequency, priority }) => {
        const lines = [`<loc>${escapeXml(url)}</loc>`];
        if (lastModified) {
            lines.push(`<lastmod>${new Date(lastModified).toISOString()}</lastmod>`);
        }
        if (changeFrequency) {
            lines.push(`<changefreq>${changeFrequency}</changefreq>`);
        }
        if (priority !== undefined) {
            lines.push(`<priority>${priority}</priority>`);
        }
        return `<url>\n${lines.join("\n")}\n</url>`;
    });
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
    return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": cacheControl } });
}
