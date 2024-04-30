import { SitePreviewProvider } from "@comet/cms-site";
import Page, { createGetUniversalProps, PageUniversalProps } from "@src/pages/[[...path]].page";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";

export default function AuthenticatedPreviewPage(props: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
    return (
        <SitePreviewProvider>
            <Page {...props} />
        </SitePreviewProvider>
    );
}

export const getServerSideProps: GetServerSideProps<PageUniversalProps> = async (context) => {
    if (process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_SITE_IS_PREVIEW !== "true") {
        return { notFound: true };
    }

    const getUniversalProps = createGetUniversalProps({
        includeInvisibleBlocks: true, // TODO Fix when migrating to App Router
        includeInvisiblePages: true,
        previewDamUrls: true,
    });
    return getUniversalProps(context);
};
