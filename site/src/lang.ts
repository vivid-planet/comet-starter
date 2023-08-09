export function getMessages(locale: string) {
    // in dev mode we use the default messages to have immediate changes
    if (process.env.NODE_ENV === "development") {
        return {};
    }

    if (locale === "en") {
        return import("../lang-compiled/en.json");
    }
    return import("../lang-compiled/de.json");
}
