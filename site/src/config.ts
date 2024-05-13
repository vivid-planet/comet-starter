export let domain = "";
export const languages = ["en", "de"];

if (process.env.NEXT_PUBLIC_SITE_DOMAIN) {
    domain = process.env.NEXT_PUBLIC_SITE_DOMAIN;
} else {
    throw new Error("Missing environment variable NEXT_PUBLIC_SITE_DOMAIN");
}
