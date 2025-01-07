import NotFoundContent from "@src/documents/NotFound";
import { IntlProvider } from "@src/util/IntlProvider";
import { loadMessages } from "@src/util/loadMessages";
import { getNotFoundContext } from "@src/util/NotFoundContext";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { SiteConfigProvider } from "@src/util/SiteConfigProvider";

import Layout from "./[[...path]]/layout";

export default async function NotFound() {
    const { domain, language } = getNotFoundContext() || { domain: "main", language: "en" };
    const messages = await loadMessages(language);

    return (
        <html lang={language}>
            <body>
                <IntlProvider locale={language} messages={messages}>
                    <SiteConfigProvider siteConfig={getSiteConfigForDomain(domain)}>
                        <Layout params={{ domain, language }}>
                            <main>
                                <NotFoundContent scope={{ domain, language }} />
                            </main>
                        </Layout>
                    </SiteConfigProvider>
                </IntlProvider>
            </body>
        </html>
    );
}
