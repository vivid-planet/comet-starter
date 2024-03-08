import { parsePreviewParams, SitePreviewProvider } from "@comet/cms-site";
import { useContentScope } from "@src/common/contentScope/ContentScope";
import Page, { createGetUniversalProps, PageUniversalProps } from "@src/pages/[[...path]].page";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

export default function AuthenticatedPreviewPage(props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    const scope = useContentScope();

    return (
        <SitePreviewProvider previewPath={`/preview/${scope.domain}/${scope.language}`}>
            <Page {...props} />
        </SitePreviewProvider>
    );
}

export const getServerSideProps: GetServerSideProps<PageUniversalProps> = async (context) => {
    if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SITE_IS_PREVIEW !== "true") {
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
