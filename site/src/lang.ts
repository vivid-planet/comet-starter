import { ContentScope } from "./common/contentScope/ContentScope";

export function getMessages(scope: ContentScope) {
    if (scope.language === "en") {
        return import("../lang-compiled/en.json");
    }
    return import("../lang-compiled/de.json");
}
