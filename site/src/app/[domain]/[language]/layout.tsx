import { gql, previewParams } from "@comet/cms-site";
import { IntlProvider } from "@src/app/[domain]/[language]/IntlProvider";
import { GQLLayoutQuery, GQLLayoutQueryVariables } from "@src/app/[domain]/[language]/layout.generated";
import { getSiteConfigForDomain } from "@src/config";
import { Header } from "@src/layout/header/Header";
import { headerFragment } from "@src/layout/header/Header.fragment";
import { createGraphQLFetch } from "@src/util/graphQLClient";
import { readFile } from "fs/promises";
import { notFound } from "next/navigation";

const messagesCache: Record<string, unknown> = {};
async function loadMessages(language: string) {
    if (messagesCache[language]) return messagesCache[language];
    const path = `./lang-compiled/${language}.json`;
    const messages = JSON.parse(await readFile(path, "utf8"));
    messagesCache[language] = messages;
    return messages;
}

export default async function Page({
    children,
    params: { domain, language },
}: {
    children: React.ReactNode;
    params: { domain: string; language: string };
}) {
    const siteConfig = getSiteConfigForDomain(domain);

    if (!siteConfig.languages.includes(language)) {
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
