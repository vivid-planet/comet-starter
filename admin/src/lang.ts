import { enUS as coreEn } from "@mui/material/locale";
import { enUS as dataGridEn } from "@mui/x-data-grid-pro/locales";
import { enUS as datePickersEn } from "@mui/x-date-pickers/locales";
import type { Locale } from "date-fns";
import { enUS } from "date-fns/locale";
import { type ResolvedIntlConfig } from "react-intl";

import comet_messages_en from "../lang-compiled/comet-lang/en.json";
import project_messages_en from "../lang-compiled/starter-admin/en.json";

// Add additional languages here. The structure below resolves messages, date-fns and MUI locales for every supported language,
// so adding a language is a matter of adding its code and the corresponding imports.
const supportedLanguages = ["en"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

const fallbackLanguage: SupportedLanguage = "en";

function getClosestSupportedLanguageFromBrowserLanguages(): SupportedLanguage {
    const browserLanguages = typeof navigator !== "undefined" ? (navigator.languages ?? [navigator.language]) : [];

    const language = browserLanguages
        .map((browserLanguage) => browserLanguage.split("-")[0].toLowerCase())
        .find((language): language is SupportedLanguage => supportedLanguages.includes(language as SupportedLanguage));

    return language ?? fallbackLanguage;
}

const cometMessages = {
    en: comet_messages_en,
} satisfies Record<SupportedLanguage, ResolvedIntlConfig["messages"]>;

const projectMessages = {
    en: project_messages_en,
} satisfies Record<SupportedLanguage, ResolvedIntlConfig["messages"]>;

function getMessages(language: SupportedLanguage): ResolvedIntlConfig["messages"] {
    return {
        ...cometMessages[language],
        ...projectMessages[language],
    };
}

const dateFnsLocales: Record<SupportedLanguage, Locale> = {
    en: enUS,
};

const muiLocales: Record<SupportedLanguage, object[]> = {
    en: [coreEn, dataGridEn, datePickersEn],
};

export function getLanguageConfig(): {
    language: SupportedLanguage;
    messages: ResolvedIntlConfig["messages"];
    dateFnsLocale: Locale;
    muiLocale: object[];
} {
    const language = getClosestSupportedLanguageFromBrowserLanguages();

    return {
        language,
        messages: getMessages(language),
        dateFnsLocale: dateFnsLocales[language],
        muiLocale: muiLocales[language],
    };
}
