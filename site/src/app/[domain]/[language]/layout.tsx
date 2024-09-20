import { gql, previewParams } from "@comet/cms-site";
import { GQLLayoutQuery, GQLLayoutQueryVariables } from "@src/app/[domain]/[language]/layout.generated";
import { IntlProvider } from "@src/common/intl/IntlProvider";
import { loadMessages } from "@src/common/intl/loadMessages";
import { Header } from "@src/layout/header/Header";
import { headerFragment } from "@src/layout/header/Header.fragment";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { getSiteConfigForDomain } from "@src/util/siteConfig";
import { notFound } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Page({ children, params: { language, domain } }: PropsWithChildren<{ params: { language: string; domain: string } }>) {
    const siteConfig = getSiteConfigForDomain(domain);

    if (!siteConfig.scope.languages.includes(language)) {
        notFound();
    }

    const messages = await loadMessages(language);

    const { previewData } = (await previewParams()) || { previewData: undefined };
    const graphqlFetch = createGraphQLFetch(previewData);

    const { header } = await graphqlFetch<GQLLayoutQuery, GQLLayoutQueryVariables>(
        gql`
            query Layout($domain: String!, $language: String!) {
                header: mainMenu(scope: { domain: $domain, language: $language }) {
                    ...Header
                }
            }
            ${headerFragment}
        `,
        { domain, language },
    );

    return (
        <IntlProvider locale={language} messages={messages}>
            <Header header={header} />
            {children}
        </IntlProvider>
    );
}
