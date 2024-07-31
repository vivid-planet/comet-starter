import { IntlProvider } from "@src/app/[domain]/[language]/IntlProvider";
import { getSiteConfigForScope } from "@src/config";
import { readFile } from "fs/promises";
import { notFound } from "next/navigation";

const messagesCache: Record<string, unknown> = {};
async function loadMessages(language: string) {
    if (messagesCache[language]) return messagesCache[language];
    const path = `./lang-compiled/${language}.json`;
    const messages = JSON.parse(await readFile(path, "utf8"));
    messagesCache[language] = messages;
    return messages;
}

export default async function Page({
    children,
    params: { domain, language },
}: {
    children: React.ReactNode;
    params: { domain: string; language: string };
}) {
    const siteConfig = getSiteConfigForScope({ domain, language });

    if (!siteConfig.languages.includes(language)) {
        notFound();
    }

    const messages = await loadMessages(language);
    return (
        <IntlProvider locale={language} messages={messages}>
            {children}
        </IntlProvider>
    );
}
