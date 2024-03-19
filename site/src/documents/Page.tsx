import { SeoBlock } from "@src/documents/blocks/SeoBlock";
import { Layout, PropsWithLayout } from "@src/layout/Layout";
import { gql } from "graphql-request";
import * as React from "react";

import { PageContentBlock } from "./blocks/PageContentBlock";
import { DocumentTypeLoaderOptions, InferDocumentTypeLoaderPropsType } from "./index";
import { GQLPageQuery, GQLPageQueryVariables } from "./Page.generated";

const pageQuery = gql`
    query Page($pageTreeNodeId: ID!) {
        pageContent: pageTreeNode(id: $pageTreeNodeId) {
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

export async function loader({ client, pageTreeNodeId }: DocumentTypeLoaderOptions) {
    return client.request<GQLPageQuery, GQLPageQueryVariables>(pageQuery, {
        pageTreeNodeId,
    });
}

export function Page(props: PropsWithLayout<InferDocumentTypeLoaderPropsType<typeof loader>>): JSX.Element {
    if (!props.pageContent) throw new Error("Could not load page content");
    const document = props.pageContent?.document;
    if (document?.__typename != "Page") throw new Error("invalid document type");

    return (
        <Layout {...props.layout}>
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
