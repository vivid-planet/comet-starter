import { getSiteConfigForRequest } from "@app/util/siteConfig";
import type { Route } from "./+types/robots.txt";

export async function loader({ request }: Route.LoaderArgs) {
      const siteConfig = await getSiteConfigForRequest(request);
      if (!siteConfig) throw new Error("SiteConfig not found");
    
    const robotText = "User-agent: *\n"+
        "Allow: /\n"+
        "Sitemap: "+siteConfig.url +"/sitemap.xml\n";
    return new Response(robotText,{
        status: 200,
        headers: {
            "Content-Type": "text/plain",
        }
    });
}
