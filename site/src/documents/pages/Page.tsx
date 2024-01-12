import { SeoBlock } from "@src/documents/pages/blocks/SeoBlock";
import { Layout } from "@src/layout/Layout";
import { PageUniversalProps } from "@src/pages/[[...path]].page";
import { gql } from "graphql-request";
import * as React from "react";

import { PageContentBlock } from "./blocks/PageContentBlock";

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

export function Page(props: PageUniversalProps): JSX.Element {
    const document = props.pageContent?.document;
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
