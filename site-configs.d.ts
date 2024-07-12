import type { BaseSiteConfig, ExtractPrivateSiteConfig, ExtractPublicSiteConfig } from "@comet/cli";

export type ContentScope = {
    domain: string;
    language: string;
};

export interface SiteConfig extends BaseSiteConfig {
    contentScope: ContentScope;
    preloginPassword?: string;
}

export type PrivateSiteConfig = ExtractPrivateSiteConfig<SiteConfig>;
export type PublicSiteConfig = ExtractPublicSiteConfig<SiteConfig> & { public: { previewUrl: string } };
