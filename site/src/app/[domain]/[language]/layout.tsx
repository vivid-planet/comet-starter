import { IntlProvider } from "@src/util/IntlProvider";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { readFile } from "fs/promises";
import { PropsWithChildren } from "react";

const messagesCache: Record<string, unknown> = {};
export async function loadMessages(language: string) {
    if (messagesCache[language]) return messagesCache[language];
    const path = `./lang-compiled/${language}.json`;
    const messages = JSON.parse(await readFile(path, "utf8"));
    messagesCache[language] = messages;
    return messages;
}

export default async function Page({ children, params: { domain, language } }: PropsWithChildren<{ params: { domain: string; language: string } }>) {
    const siteConfig = getSiteConfigForDomain(domain);
    if (!siteConfig.scope.languages.includes(language)) {
        language = "en";
    }

    const messages = await loadMessages(language);
    return (
        <IntlProvider locale={language} messages={messages}>
            {children}
        </IntlProvider>
    );
}
