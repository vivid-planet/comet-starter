import { parsePreviewParams, SitePreviewProvider } from "@comet/cms-site";
import Page, { createGetUniversalProps, PageUniversalProps } from "@src/pages/[[...path]].page";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

export default function AuthenticatedPreviewPage(props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    return (
        <SitePreviewProvider previewPath={`/preview/${props.domain}`}>
            <Page {...props} />
        </SitePreviewProvider>
    );
}

export const getServerSideProps: GetServerSideProps<PageUniversalProps> = async (context) => {
    if (process.env.NODE_ENV === "production" && process.env.SITE_IS_PREVIEW !== "true") {
        return { notFound: true };
    }

    const { includeInvisibleBlocks } = parsePreviewParams(context.query);
    const getUniversalProps = createGetUniversalProps({
        includeInvisibleBlocks,
        includeInvisiblePages: true,
        previewDamUrls: true,
    });
    return getUniversalProps(context);
};
