import type { BaseSiteConfig, ExtractPrivateSiteConfig, ExtractPublicSiteConfig } from "@comet/cli";

export type ContentScope = {
    domain: string;
    language: string;
};

export interface SiteConfig extends BaseSiteConfig {
    preloginPassword?: string;
    public: {
        domain: string;
        languages: string[];
    };
}

export type PrivateSiteConfig = ExtractPrivateSiteConfig<SiteConfig>;
export type PublicSiteConfig = ExtractPublicSiteConfig<SiteConfig>;
