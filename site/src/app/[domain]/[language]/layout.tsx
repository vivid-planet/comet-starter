import { IntlProvider } from "@src/app/[domain]/[language]/IntlProvider";
import { readFile } from "fs/promises";

const messagesCache: Record<string, unknown> = {};
async function loadMessages(language: string) {
    if (messagesCache[language]) return messagesCache[language];
    const path = `./lang-compiled/${language}.json`;
    const messages = JSON.parse(await readFile(path, "utf8"));
    messagesCache[language] = messages;
    return messages;
}

export default async function Page({ children, params: { language } }: { children: React.ReactNode; params: { language: string } }) {
    const messages = await loadMessages(language);
    return (
        <IntlProvider locale={language} messages={messages}>
            {children}
        </IntlProvider>
    );
}
