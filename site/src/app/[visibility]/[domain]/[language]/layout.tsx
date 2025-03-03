import { SitePreviewProvider } from "@comet/cms-site";
import { IntlProvider } from "@src/util/IntlProvider";
import { loadMessages } from "@src/util/loadMessages";
import { setNotFoundContext } from "@src/util/ServerContext";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";
import { draftMode } from "next/headers";
import { type PropsWithChildren } from "react";

export default async function Page({ children, params: { domain, language } }: PropsWithChildren<{ params: { domain: string; language: string } }>) {
    const siteConfig = getSiteConfigForDomain(domain);
    if (!siteConfig.scope.languages.includes(language)) {
        language = "en";
    }
    setNotFoundContext({ domain, language });

    const isDraftModeEnabled = draftMode().isEnabled;

    const messages = await loadMessages(language);
    return (
        <html lang={language}>
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
                    <SiteConfigProvider siteConfig={siteConfig}>
                        {isDraftModeEnabled ? <SitePreviewProvider>{children}</SitePreviewProvider> : children}
                    </SiteConfigProvider>
                </IntlProvider>
            </body>
        </html>
    );
}
