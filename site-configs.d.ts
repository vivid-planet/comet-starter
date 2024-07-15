import type { BaseSiteConfig, ExtractPrivateSiteConfig, ExtractPublicSiteConfig } from "@comet/cli";

export type ContentScope = {
    domain: string;
    language: string;
};

export interface SiteConfig extends Omit<BaseSiteConfig, "contentScope"> {
    preloginPassword?: string;
}

export type PrivateSiteConfig = ExtractPrivateSiteConfig<SiteConfig> & {
    domain: string;
    languages: string[];
    contentScopes: Array<ContentScope>;
};
export type PublicSiteConfig = ExtractPublicSiteConfig<SiteConfig> & {
    public: {
        previewUrl: string;
        domain: string;
        languages: string[];
        contentScopes: Array<ContentScope>;
    };
};
