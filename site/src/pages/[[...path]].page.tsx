import { inferContentScopeFromContext } from "@src/common/contentScope/inferContentScopeFromContext";
import { domain as configuredDomain } from "@src/config";
import { documentTypes } from "@src/documents/pages";
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

import { GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables, GQLPagesQuery, GQLPagesQueryVariables } from "./[[...path]].page.generated";

export type PageProps = {
    documentType: string;
    id: string;
} & Record<string, unknown>;

export default function Page(props: InferGetStaticPropsType<typeof getStaticProps>): JSX.Element {
    if (!documentTypes[props.documentType]) {
        return (
            <NotFound404>
                <div>
                    unknown documentType: <em>{props.documentType}</em>
                </div>
            </NotFound404>
        );
    }
    const { component: Component } = documentTypes[props.documentType];
    return <Component {...props} />;
}

const documentTypeQuery = gql`
    query DocumentType($path: String!, $scope: PageTreeNodeScopeInput!) {
        pageTreeNodeByPath(path: $path, scope: $scope) {
            id
            documentType
        }
    }
`;

export const getStaticProps: GetStaticProps<PageProps> = async (context) => {
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
    return async function getUniversalProps<Context extends GetStaticPropsContext | GetServerSidePropsContext>(
        context: Context,
    ): Promise<Context extends GetStaticPropsContext ? GetStaticPropsResult<PageProps> : GetServerSidePropsResult<PageProps>> {
        const { params } = context;

        const client = createGraphQLClient({ includeInvisibleBlocks, includeInvisiblePages, previewDamUrls });
        const scope = inferContentScopeFromContext(context);

        const path = params?.path ?? "";

        //fetch documentType
        const data = await client.request<GQLDocumentTypeQuery, GQLDocumentTypeQueryVariables>(documentTypeQuery, {
            path: `/${Array.isArray(path) ? path.join("/") : path}`,
            scope,
        });
        if (!data.pageTreeNodeByPath?.documentType) {
            // eslint-disable-next-line no-console
            console.log("got no data from api", data, path);
            return { notFound: true };
        }
        const pageTreeNodeId = data.pageTreeNodeByPath.id;

        //documentType dependent loader
        const { loader: loaderForPageType } = documentTypes[data.pageTreeNodeByPath.documentType];

        const [layout, documentTypeData] = await Promise.all([getLayout(client, scope), loaderForPageType({ client, scope, pageTreeNodeId })]);

        return {
            props: {
                layout,
                ...documentTypeData,
                documentType: data.pageTreeNodeByPath.documentType,
                id: pageTreeNodeId,
                scope,
            },
        };
    };
}

const pagesQuery = gql`
    query Pages($scope: PageTreeNodeScopeInput!) {
        pageTreeNodeList(scope: $scope) {
            id
            path
            documentType
        }
    }
`;

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
    const paths: Array<{ params: { path: string[] }; locale: string }> = [];
    if (process.env.NEXT_PUBLIC_SITE_IS_PREVIEW !== "true") {
        for (const locale of locales) {
            const data = await createGraphQLClient().request<GQLPagesQuery, GQLPagesQueryVariables>(pagesQuery, {
                scope: { domain: configuredDomain, language: locale },
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
