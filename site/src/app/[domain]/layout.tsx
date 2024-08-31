import { SitePreviewProvider } from "@comet/cms-site";
import { IntlProvider } from "@src/app/[domain]/[language]/IntlProvider";
import { GlobalStyle } from "@src/layout/GlobalStyle";
import { getSiteConfig } from "@src/middleware";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import { readFile } from "fs/promises";
import type { Metadata } from "next";
import { draftMode } from "next/headers";
import { PublicEnvScript } from "next-runtime-env";

export const metadata: Metadata = {
    title: "Comet Starter",
};

const messagesCache: Record<string, unknown> = {};
async function loadMessages(language: string) {
    if (messagesCache[language]) return messagesCache[language];
    const path = `./lang-compiled/${language}.json`;
    const messages = JSON.parse(await readFile(path, "utf8"));
    messagesCache[language] = messages;
    return messages;
}

export default async function RootLayout({
    children,
    params: { language },
}: Readonly<{
    children: React.ReactNode;
    params: { language: string };
}>) {
    const siteConfig = await getSiteConfig();
    const isDraftModeEnabled = draftMode().isEnabled;
    const messages = await loadMessages(language);

    return (
        <html>
            <head>
                <PublicEnvScript />
            </head>
            <body>
                {siteConfig.gtmId && (
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.gtmId}`}
                            height="0"
                            width="0"
                            style={{ display: "none", visibility: "hidden" }}
                        />
                    </noscript>
                )}
                <IntlProvider locale={language} messages={messages}>
                    <StyledComponentsRegistry>
                        <GlobalStyle />
                        <ResponsiveSpacingStyle />
                        {isDraftModeEnabled ? <SitePreviewProvider>{children}</SitePreviewProvider> : children}
                    </StyledComponentsRegistry>
                </IntlProvider>
            </body>
        </html>
    );
}
