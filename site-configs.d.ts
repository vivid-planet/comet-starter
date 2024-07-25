import type { BaseSiteConfig, ExtractPrivateSiteConfig, ExtractPublicSiteConfig } from "@comet/cli";

export type ContentScope = {
    domain: string;
    language: string;
};

export interface SiteConfig extends BaseSiteConfig {
    preloginPassword?: string;
    public: {
        contentScope: ContentScope;
    };
}

export type PrivateSiteConfig = ExtractPrivateSiteConfig<SiteConfig> & { contentScope: ContentScope };
export type PublicSiteConfig = ExtractPublicSiteConfig<SiteConfig> & { contentScope: ContentScope };
