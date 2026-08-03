import { IntlProvider } from "@src/util/IntlProvider";
import { loadMessages } from "@src/util/loadMessages";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";

export default async function Page({ children, params }: LayoutProps<"/block-preview/[domain]/[language]">) {
    const { domain, language } = await params;
    const siteConfig = getSiteConfigForDomain(domain);
    const messages = await loadMessages(language);
    return (
        <html lang={language}>
            <body>
                <IntlProvider locale={language} messages={messages}>
                    <SiteConfigProvider siteConfig={siteConfig}>{children}</SiteConfigProvider>
                </IntlProvider>
            </body>
        </html>
    );
}
