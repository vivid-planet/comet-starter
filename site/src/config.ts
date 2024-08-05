import { env } from "next-runtime-env";

import { PublicSiteConfig as SiteConfig } from "../../site-configs.d";

export type { SiteConfig };

export function getSiteConfigForDomain(domainParam: string) {
    const domain = decodeURIComponent(domainParam);
    const siteConfig = getSiteConfigs().find((siteConfig) => siteConfig.domain === domain);
    if (!siteConfig) throw new Error(`SiteConfig not found for domain ${domain}`);
    return siteConfig;
}

let siteConfigs: SiteConfig[];
export function getSiteConfigs() {
    if (!siteConfigs) {
        const json = typeof window === "undefined" ? process.env.NEXT_PUBLIC_SITE_CONFIGS : env("NEXT_PUBLIC_SITE_CONFIGS");
        if (!json) throw new Error("process.env.NEXT_PUBLIC_SITE_CONFIGS must be set.");
        siteConfigs = JSON.parse(json) as SiteConfig[];
    }
    return siteConfigs;
}
