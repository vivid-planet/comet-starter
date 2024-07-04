import { GQLDomain, GQLLanguage } from "./graphql.generated";

export let domain: GQLDomain;
export let languages: GQLLanguage[] = [];
export let defaultLanguage: GQLLanguage;

if (process.env.NEXT_PUBLIC_SITE_IS_PREVIEW !== "true") {
    if (process.env.NEXT_PUBLIC_SITE_DOMAIN) {
        domain = process.env.NEXT_PUBLIC_SITE_DOMAIN as GQLDomain;
    } else {
        throw new Error("Missing environment variable NEXT_PUBLIC_SITE_DOMAIN");
    }

    if (process.env.NEXT_PUBLIC_SITE_LANGUAGES) {
        languages = process.env.NEXT_PUBLIC_SITE_LANGUAGES.split(",") as GQLLanguage[];
    } else {
        throw new Error("Missing environment variable NEXT_PUBLIC_SITE_LANGUAGES");
    }

    if (process.env.NEXT_PUBLIC_SITE_DEFAULT_LANGUAGE) {
        defaultLanguage = process.env.NEXT_PUBLIC_SITE_DEFAULT_LANGUAGE as GQLLanguage;
    } else {
        throw new Error("Missing environment variable NEXT_PUBLIC_SITE_DEFAULT_LANGUAGE");
    }
}
