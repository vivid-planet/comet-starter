import { ResolvedIntlConfig } from "react-intl";

import starter_messages_de from "../lang-compiled/de.json";
import starter_messages_en from "../lang-compiled/en.json";

const cometStarterMessages = {
    en: starter_messages_en,
    de: starter_messages_de,
};

export const getMessages = (): ResolvedIntlConfig["messages"] => {
    // in dev mode we use the default messages to have immediate changes
    if (process.env.NODE_ENV === "development") {
        return {};
    }

    return {
        ...cometStarterMessages["en"],
    };
};
