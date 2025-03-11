import { theme } from "@src/theme";
import { IntlProvider } from "@src/util/IntlProvider";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { Header } from "./header/Header";
import { Footer } from "./footer/Footer";
import { headerFragment } from "./header/Header.fragment";
import { footerFragment } from "./footer/Footer.fragment";
import { loadMessages } from "@src/util/loadMessages";
import { createGraphQLFetch } from "@src/util/createGraphQLFetch";
import { getSiteConfigForRequest } from "@src/util/siteConfig";
import { previewParams } from "@src/util/sitePreview";
import { Request } from "express";
import { gql } from "@comet/cms-site";
import { GQLLayoutQuery, GQLLayoutQueryVariables } from "./Layout.generated";
import { serverOnly$ } from "vite-env-only/macros";

export const loader = serverOnly$(async (request: Request) => {
    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const preview = await previewParams(request);

    const language = request.params.language;
    const scope = { domain: siteConfig.scope.domain, language };
    const graphqlFetch = createGraphQLFetch(preview?.previewData);

    return {
        language,
        messages: await loadMessages!(language),
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
});

export function Layout({ children, loaderData }: PropsWithChildren<{ loaderData: Awaited<ReturnType<NonNullable<typeof loader>>> }>) {
    return <ThemeProvider theme={theme}>
        <IntlProvider locale={loaderData.language} messages={loaderData.messages}>
            <Header header={loaderData.header} />
            {children}
            {loaderData.footer && <Footer footer={loaderData.footer} />}
        </IntlProvider>
    </ThemeProvider>;

}
