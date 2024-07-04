import { getSiteConfig } from "@src/config";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import { readFile } from "fs/promises";
import type { Metadata } from "next";

import { IntlProvider } from "./IntlProvider";

export const metadata: Metadata = {
    title: "Comet Starter",
};

const messagesCache: Record<string, unknown> = {};
async function loadMessages(lang: string) {
    if (messagesCache[lang]) return messagesCache[lang];
    const path = `./lang-compiled/${lang}.json`;
    const messages = JSON.parse(await readFile(path, "utf8"));
    messagesCache[lang] = messages;
    return messages;
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Layout must not throw notFound() but getSiteConfig() might, so catch it here and render a basic 404
    let siteConfig;
    try {
        siteConfig = await getSiteConfig();
    } catch (error) {
        if (error.message !== "NEXT_NOT_FOUND") throw error;
        return (
            <html>
                <body>{children}</body>
            </html>
        );
    }

    const messages = await loadMessages(siteConfig.contentScope.language);

    return (
        <html>
            <body>
                <IntlProvider locale={siteConfig.contentScope.language} messages={messages}>
                    <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
                </IntlProvider>
            </body>
        </html>
    );
}
