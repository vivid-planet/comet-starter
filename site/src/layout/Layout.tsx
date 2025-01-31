import "@fontsource/roboto";
import "@fontsource/roboto/700.css";

import { GlobalStyle } from "@src/layout/GlobalStyle";
import { ErrorHandler } from "@src/util/ErrorHandler";
import { IntlProvider } from "@src/util/IntlProvider";
import { loadMessages } from "@src/util/loadMessages";
import { ResponsiveSpacingStyle } from "@src/util/ResponsiveSpacingStyle";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";
import StyledComponentsRegistry from "@src/util/StyledComponentsRegistry";
import { draftMode } from "next/headers";
import { PropsWithChildren } from "react";

export default async function Layout({
    children,
    domain,
    language,
    isPreview,
}: PropsWithChildren<{ domain: string; language: string; isPreview?: boolean }>) {
    const siteConfig = getSiteConfigForDomain(domain);
    if (!siteConfig.scope.languages.includes(language)) {
        language = "en";
    }
    if (isPreview === undefined) isPreview = draftMode().isEnabled;

    const messages = await loadMessages(language);
    return (
        <html lang={language}>
            <body>
                {!isPreview && siteConfig.gtmId && (
                    <noscript>
                        <iframe
                            src={`https://www.googletagmanager.com/ns.html?id=${siteConfig.gtmId}`}
                            height="0"
                            width="0"
                            style={{ display: "none", visibility: "hidden" }}
                        />
                    </noscript>
                )}
                <StyledComponentsRegistry>
                    <GlobalStyle />
                    <ResponsiveSpacingStyle />
                    <ErrorHandler>
                        <IntlProvider locale={language} messages={messages}>
                            <SiteConfigProvider siteConfig={siteConfig}>{children}</SiteConfigProvider>
                        </IntlProvider>
                    </ErrorHandler>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
