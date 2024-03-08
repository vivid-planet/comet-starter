import { ResolvedIntlConfig } from "react-intl";

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

export const getMessages = (): ResolvedIntlConfig["messages"] => {
<<<<<<< HEAD
    // in dev mode we use the default messages to have immediate changes
    if (import.meta.env.MODE === "development") {
        return {};
    }

=======
>>>>>>> origin/main
    return {
        ...cometMessages["en"],
        ...projectMessages["en"],
    };
};
