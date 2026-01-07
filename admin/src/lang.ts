import { type ResolvedIntlConfig } from "react-intl";

import comet_messages_de from "../lang-compiled/comet-lang/de.json";
import comet_messages_en from "../lang-compiled/comet-lang/en.json";
import project_messages_de from "../lang-compiled/starter-admin/de.json";
import project_messages_en from "../lang-compiled/starter-admin/en.json";

const cometMessages = {
    en: comet_messages_en,
    de: comet_messages_de,
};

const projectMessages = {
    en: project_messages_en,
    de: project_messages_de,
};

export const getMessages = (language: "de" | "en"): ResolvedIntlConfig["messages"] => {
    if (language === "de") {
        return {
            ...cometMessages["de"],
            ...projectMessages["de"],
        };
    }

    return {
        ...cometMessages["en"],
        ...projectMessages["en"],
    };
};
