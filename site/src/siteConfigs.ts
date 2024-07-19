import { env } from "next-runtime-env";

import { ContentScope } from "../../site-configs.d";
import { SiteConfig } from "./config";

let siteConfigs: SiteConfig[];
export function getSiteConfigs() {
    if (!siteConfigs) {
        const json = env("NEXT_PUBLIC_SITE_CONFIGS") ?? process.env.NEXT_PUBLIC_SITE_CONFIGS;
        if (!json) throw new Error("process.env.NEXT_PUBLIC_SITE_CONFIGS must be set.");
        siteConfigs = JSON.parse(json) as SiteConfig[];
    }
    return siteConfigs;
}

export function getSiteConfigFromScope(scope: ContentScope) {
    return getSiteConfigs().find((siteConfig) => siteConfig.domain === scope.domain);
}
