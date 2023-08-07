import { defaultLanguage, domain as configuredDomain } from "@src/config";
import { Page as PageTypePage, pageQuery as PageTypePageQuery } from "@src/documents/pages/Page";
import { GQLPage } from "@src/graphql.generated";
import { getLayout } from "@src/layout/Layout";
import NotFound404 from "@src/pages/404.page";
import { createGraphQLClient } from "@src/util/createGraphQLClient";
import { gql } from "graphql-request";
import {
    GetServerSidePropsContext,
    GetServerSidePropsResult,
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext,
    GetStaticPropsResult,
    InferGetStaticPropsType,
} from "next";
import * as React from "react";

import { GQLPagesQuery, GQLPagesQueryVariables, GQLPageTypeQuery, GQLPageTypeQueryVariables } from "./[[...path]].page.generated";

interface PageProps {
    documentType: string;
    id: string;
    domain: string;
}
export type PageUniversalProps = PageProps & GQLPage;

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    if (!pageTypes[props.documentType]) {
        return (
            <NotFound404>
                <div>
                    unknown documentType: <em>{props.documentType}</em>
                </div>
            </NotFound404>
        );
    }
    const { component: Component } = pageTypes[props.documentType];
    return <Component {...props} />;
}

const pageTypeQuery = gql`
    query PageType($path: String!, $contentScope: PageTreeNodeScopeInput!) {
        pageTreeNodeByPath(path: $path, scope: $contentScope) {
            id
            documentType
        }
    }
`;

const pageTypes = {
    Page: {
        query: PageTypePageQuery,
        component: PageTypePage,
    },
};

export const getStaticProps: GetStaticProps<PageUniversalProps> = async (context) => {
    const getUniversalProps = createGetUniversalProps();
    return getUniversalProps(context);
};

interface CreateGetUniversalPropsOptions {
    includeInvisibleBlocks?: boolean;
    includeInvisiblePages?: boolean;
    previewDamUrls?: boolean;
}

// a function to create a universal function which can be used as getStaticProps or getServerSideProps (preview)
export function createGetUniversalProps({
    includeInvisibleBlocks = false,
    includeInvisiblePages = false,
    previewDamUrls = false,
}: CreateGetUniversalPropsOptions = {}) {
    return async function getUniversalProps<Context extends GetStaticPropsContext | GetServerSidePropsContext>({
        params,
        locale = defaultLanguage,
    }: Context): Promise<
        Context extends GetStaticPropsContext ? GetStaticPropsResult<PageUniversalProps> : GetServerSidePropsResult<PageUniversalProps>
    > {
        const client = createGraphQLClient({ includeInvisibleBlocks, includeInvisiblePages, previewDamUrls });

        const path = params?.path ?? "";
        let domain: string;
        if (params && params.domain) {
            domain = String(params.domain);
        } else {
            domain = configuredDomain;
        }
        const contentScope = { domain, language: locale };

        //fetch pageType
        const data = await client.request<GQLPageTypeQuery, GQLPageTypeQueryVariables>(pageTypeQuery, {
            path: `/${Array.isArray(path) ? path.join("/") : path}`,
            contentScope,
        });
        if (!data.pageTreeNodeByPath?.documentType) {
            // eslint-disable-next-line no-console
            console.log("got no data from api", data, path);
            return { notFound: true };
        }
        const pageId = data.pageTreeNodeByPath.id;

        //pageType dependent query
        const { query: queryForPageType } = pageTypes[data.pageTreeNodeByPath.documentType];

        const [layout, pageTypeData] = await Promise.all([getLayout(client, contentScope), client.request(queryForPageType, { pageId })]);

        return {
            props: {
                layout,
                ...pageTypeData,
                documentType: data.pageTreeNodeByPath.documentType,
                id: pageId,
                domain,
            },
        };
    };
}

const pagesQuery = gql`
    query Pages($contentScope: PageTreeNodeScopeInput!) {
        pageTreeNodeList(scope: $contentScope) {
            id
            path
            documentType
        }
    }
`;

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
    const paths: Array<{ params: { path: string[] }; locale: string }> = [];
    if (process.env.SITE_IS_PREVIEW !== "true") {
        for (const locale of locales) {
            const data = await createGraphQLClient().request<GQLPagesQuery, GQLPagesQueryVariables>(pagesQuery, {
                contentScope: { domain: configuredDomain, language: locale },
            });

            paths.push(
                ...data.pageTreeNodeList
                    .filter((page) => page.documentType === "Page")
                    .map((page) => {
                        const path = page.path.split("/");
                        path.shift(); // Remove "" caused by leading slash
                        return { params: { path }, locale };
                    }),
            );
        }
    }
    return {
        paths,
        fallback: false,
    };
};
