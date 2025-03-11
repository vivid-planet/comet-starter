import { IntlProvider } from "@app/util/IntlProvider";
import type { Route } from "./+types/layout";
import { Outlet } from "react-router";
import { loadMessages } from "@app/util/loadMessages";
import { createGraphQLFetch } from "@app/util/createGraphQLFetch";
import { headerFragment } from "@app/layout/header/Header.fragment";
import { footerFragment } from "@app/layout/footer/Footer.fragment";
import { gql } from "@comet/cms-site";
import { Header } from "@app/layout/header/Header";
import { Footer } from "@app/layout/footer/Footer";
import type { GQLLayoutQuery, GQLLayoutQueryVariables } from "./layout.generated";
import { getSiteConfigForRequest } from "@app/util/siteConfig";
import { previewParams } from "@app/util/sitePreview";

export async function loader({ params, request }: Route.LoaderArgs) {
    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const preview = await previewParams(request);

    const language = params.language || "en";
    const scope = { domain: siteConfig.scope.domain, language };
    const graphqlFetch = createGraphQLFetch(preview?.previewData);

    return {
        language,
        messages: await loadMessages(language),
        ...await graphqlFetch<GQLLayoutQuery, GQLLayoutQueryVariables>(
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
            scope,
        )
    };
}

export default function Layout({ loaderData }: Route.ComponentProps) {
    return <IntlProvider locale={loaderData.language} messages={loaderData.messages}>
        <Header header={loaderData.header} />
        <Outlet />
        {loaderData.footer && <Footer footer={loaderData.footer} />}
    </IntlProvider>;
}
