// This file is meant to be deleted in the process of creating a data-driven application

export type ContentScope = {
    domain: string;
    language: string;
};

export type PublicSiteConfig = {
    url: "";
    preloginEnabled: false;
    scope: {
        domain: string;
        languages: string[];
    };
};

export type PrivateSiteConfig = PublicSiteConfig;
