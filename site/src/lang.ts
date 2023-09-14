import { ContentScope } from "./common/contentScope/ContentScope";

export function getMessages(scope: ContentScope) {
    // in dev mode we use the default messages to have immediate changes
    if (process.env.NODE_ENV === "development") {
        return {};
    }

    if (scope.language === "en") {
        return import("../lang-compiled/en.json");
    }
    return import("../lang-compiled/de.json");
}
