import { Footer } from '@app/layout/footer/Footer';
import { footerFragment } from '@app/layout/footer/Footer.fragment';
import { Header } from '@app/layout/header/Header';
import { headerFragment } from '@app/layout/header/Header.fragment';
import { createGraphQLFetch } from '@app/util/createGraphQLFetch';
import { IntlProvider } from '@app/util/IntlProvider';
import { loadMessages } from '@app/util/loadMessages';
import { getSiteConfigForRequest } from '@app/util/siteConfig';
import { previewParams } from '@app/util/sitePreview';
import { gql } from '@comet/cms-site';
import { Outlet, createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start';
import { getWebRequest } from '@tanstack/react-start/server';
import { GQLLayoutQuery, GQLLayoutQueryVariables } from './$language._layout.generated';


export const fetchData = createServerFn({ method: 'GET' })
  .validator((params: { language: string; }) => params)
  .handler(async (serverContext) => {
    const { data: params } = serverContext;
    const request = getWebRequest();
    if (!request) throw new Error("Web Request not found");

    const siteConfig = await getSiteConfigForRequest(request);
    if (!siteConfig) throw new Error("SiteConfig not found");
    const preview = await previewParams(request);

    const graphQLFetch = createGraphQLFetch(preview?.previewData);

    const language = params.language;
    const scope = { domain: siteConfig.scope.domain, language };
  return {
      language,
      messages: await loadMessages(language),
      ...await graphQLFetch<GQLLayoutQuery, GQLLayoutQueryVariables>(
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


export const Route = createFileRoute('/$language/_layout')({
    loader: (opts) => {
      return fetchData({ data: { language: opts.params.language } });
    },
  component: LayoutComponent,
})

function LayoutComponent() {
  const loaderData = Route.useLoaderData();
    return <IntlProvider locale={loaderData.language} messages={loaderData.messages}>
        <Header header={loaderData.header} />
        <Outlet />
        {loaderData.footer && <Footer footer={loaderData.footer} />}
    </IntlProvider>;
}

