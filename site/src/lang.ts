export function getMessages(locale: string) {
    if (locale === "en") {
        return import("../lang-compiled/en.json");
    }
    return import("../lang-compiled/de.json");
}
