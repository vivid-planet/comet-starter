import { gql } from "@dextinity/site-react";
import { Footer } from "@src/layout/footer/Footer";
import { footerFragment } from "@src/layout/footer/Footer.fragment";
import { Header } from "@src/layout/header/Header";
import { headerFragment } from "@src/layout/header/Header.fragment";
import { OrganizationJsonLd } from "@src/organization/OrganizationJsonLd";
import type { PublicSiteConfig } from "@src/site-configs";
import animateBoxInOnScrollStyles from "@src/util/animations/AnimateBoxInOnScroll.module.scss";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { IntlProvider } from "@src/util/IntlProvider";
import { loadMessages } from "@src/util/loadMessages";
import { recursivelyLoadBlockData } from "@src/util/recursivelyLoadBlockData";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import type { PropsWithChildren } from "react";

import type { GQLLayoutQuery, GQLLayoutQueryVariables } from "./LanguageLayout.generated";

/**
 * Falls back to "en" if the language param isn't a language of the site (e.g. the first segment of a redirect source)
 */
export function resolveLanguage(siteConfig: PublicSiteConfig, languageParam: string) {
    return siteConfig.scope.languages.includes(languageParam) ? languageParam : "en";
}

export async function LanguageLayout({ children, domain, language: languageParam }: PropsWithChildren<{ domain: string; language: string }>) {
    const siteConfig = getSiteConfigForDomain(domain);
    const language = resolveLanguage(siteConfig, languageParam);

    const graphQLFetch = createGraphQLFetch();

    const { header, footer } = await graphQLFetch<GQLLayoutQuery, GQLLayoutQueryVariables>(
        gql`
            query Layout($domain: String!, $language: String!) {
                header: mainMenu(scope: { domain: $domain, language: $language }) {
                    ...Header
                }
                footer: footer(scope: { domain: $domain, language: $language }) {
                    ...Footer
                }
            }
            ${headerFragment}
            ${footerFragment}
        `,
        { domain, language },
    );

    if (footer) {
        footer.content = await recursivelyLoadBlockData({
            blockData: footer.content,
            blockType: "FooterContent",
            graphQLFetch,
            fetch,
            scope: { domain, language },
        });
    }

    const messages = await loadMessages(language);
    return (
        <html lang={language}>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <noscript>
                    <style>{`.${animateBoxInOnScrollStyles.scrollContainer} { opacity: 1; transform: none; transition: none; }`}</style>
                </noscript>
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
                    <OrganizationJsonLd siteConfig={siteConfig} />
                    <Header header={header} />
                    {children}
                    {footer && <Footer footer={footer} />}
                </IntlProvider>
            </body>
        </html>
    );
}
