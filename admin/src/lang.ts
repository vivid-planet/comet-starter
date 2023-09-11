import { ResolvedIntlConfig } from "react-intl";

import comet_messages_de from "../lang-compiled/comet-lang/de.json";
import comet_messages_en from "../lang-compiled/comet-lang/en.json";
import starter_messages_de from "../lang-compiled/starter-admin/de.json";
import starter_messages_en from "../lang-compiled/starter-admin/en.json";

const cometMessages = {
    en: comet_messages_en,
    de: comet_messages_de,
};

const cometStarterMessages = {
    en: starter_messages_en,
    de: starter_messages_de,
};

export const getMessages = (): ResolvedIntlConfig["messages"] => {
    // in dev mode we use the default messages to have immediate changes
    if (import.meta.env.MODE === "development") {
        return {};
    }

    return {
        ...cometMessages["en"],
        ...cometStarterMessages["en"],
    };
};
