import { IntlProvider } from "@src/util/IntlProvider";
import { loadMessages } from "@src/util/loadMessages";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";
import type { PropsWithChildren } from "react";

export async function BlockPreviewLayout({ children, domain, language }: PropsWithChildren<{ domain: string; language: string }>) {
    const siteConfig = getSiteConfigForDomain(domain);
    const messages = await loadMessages(language);
    return (
        <html lang={language}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>
                <IntlProvider locale={language} messages={messages}>
                    <SiteConfigProvider siteConfig={siteConfig}>{children}</SiteConfigProvider>
                </IntlProvider>
            </body>
        </html>
    );
}
