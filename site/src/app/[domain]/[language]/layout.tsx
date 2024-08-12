import { gql, previewParams } from "@comet/cms-site";
import { IntlProvider } from "@src/common/intl/IntlProvider";
import { loadMessages } from "@src/common/intl/loadMessages";
import { getSiteConfigForDomain } from "@src/config";
import { Header } from "@src/layout/header/Header";
import { headerFragment } from "@src/layout/header/Header.fragment";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { notFound } from "next/navigation";

import { GQLLayoutQuery, GQLLayoutQueryVariables } from "./layout.generated";

export default async function Page({
    children,
    params: { domain, language },
}: {
    children: React.ReactNode;
    params: { domain: string; language: string };
}) {
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
