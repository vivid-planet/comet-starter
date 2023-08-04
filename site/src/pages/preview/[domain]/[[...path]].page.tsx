import { parsePreviewParams, SitePreviewProvider } from "@comet/cms-site";
import Page, { createGetUniversalProps } from "@src/pages/[[...path]].page";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import React from "react";

export default function AuthenticatedPreviewPage(props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    return (
        <SitePreviewProvider previewPath={`/preview/${props.domain}`}>
            <Page {...props} />
        </SitePreviewProvider>
    );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const { includeInvisibleBlocks } = parsePreviewParams(context.query);
    const getUniversalProps = createGetUniversalProps({
        includeInvisibleBlocks,
        includeInvisiblePages: true,
        previewDamUrls: true,
    });
    return getUniversalProps(context);
};
