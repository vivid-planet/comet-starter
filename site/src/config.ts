export let domain = "";
export let languages: string[] = [];
export let defaultLanguage = "";

if (process.env.NEXT_PUBLIC_SITE_IS_PREVIEW !== "true") {
    if (process.env.NEXT_PUBLIC_SITE_DOMAIN) {
        domain = process.env.NEXT_PUBLIC_SITE_DOMAIN;
    } else {
        throw new Error("Missing environment variable NEXT_PUBLIC_SITE_DOMAIN");
    }

    if (process.env.NEXT_PUBLIC_SITE_LANGUAGES) {
        languages = process.env.NEXT_PUBLIC_SITE_LANGUAGES.split(",");
    } else {
        throw new Error("Missing environment variable NEXT_PUBLIC_SITE_LANGUAGES");
    }

    if (process.env.NEXT_PUBLIC_SITE_DEFAULT_LANGUAGE) {
        defaultLanguage = process.env.NEXT_PUBLIC_SITE_DEFAULT_LANGUAGE;
    } else {
        throw new Error("Missing environment variable NEXT_PUBLIC_SITE_DEFAULT_LANGUAGE");
    }
}
