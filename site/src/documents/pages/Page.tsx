import { SeoBlock } from "@src/documents/pages/blocks/SeoBlock";
import { Layout, PropsWithLayout } from "@src/layout/Layout";
import { gql } from "graphql-request";
import Head from "next/head";
import * as React from "react";

import { PageContentBlock } from "./blocks/PageContentBlock";
import { GQLPageQuery } from "./Page.generated";

export const pageQuery = gql`
    query Page($pageId: ID!) {
        pageContent: pageTreeNode(id: $pageId) {
            name
            path
            document {
                __typename
                ... on Page {
                    content
                    seo
                }
            }
        }
    }
`;

export function Page(props: PropsWithLayout<GQLPageQuery>): JSX.Element {
    const document = props.pageContent?.document;
    return (
        <Layout {...props.layout}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {document?.__typename === "Page" && (
                <SeoBlock
                    data={document.seo}
                    title={props.pageContent?.name ?? ""}
                    canonicalUrl={`${process.env.NEXT_PUBLIC_SITE_URL}${props.pageContent?.path}`}
                />
            )}
            {document && document.__typename === "Page" ? (
                <>
                    <div>{document.content && <PageContentBlock data={document.content} />}</div>
                </>
            ) : null}
        </Layout>
    );
}
