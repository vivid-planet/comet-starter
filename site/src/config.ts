import { previewParams } from "@comet/cms-site";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { PublicSiteConfig as SiteConfig } from "../../site-configs.d";
import { getSiteConfigFromScope, getSiteConfigs } from "./siteConfigs";

export type ContentScope = SiteConfig["contentScope"];
export type { SiteConfig };

export async function getSiteConfig() {
    const host = getHost(headers());

    let siteConfig = getSiteConfigs().find((siteConfig) => siteConfig.domains.main === host || siteConfig.domains.preliminary === host);
    if (!siteConfig) {
        const preview = await previewParams();
        if (preview && preview.scope) {
            siteConfig = getSiteConfigFromScope(preview.scope as ContentScope);
        }
    }

    if (!siteConfig) notFound();
    return siteConfig;
}

export function getHost(headers?: Headers) {
    if (typeof window !== "undefined" && window.location?.host) return window.location.host;
    if (headers) {
        const host = headers.get("x-forwarded-host") ?? headers.get("host");
        if (host) return host;
    }
    throw new Error("Could not evaluate host");
}
