import { SitePreviewProvider } from "@comet/cms-site";
import Layout from "@src/layout/layout";
import { setNotFoundContext } from "@src/util/NotFoundContext";
import { draftMode } from "next/headers";
import { PropsWithChildren } from "react";

export default async function DomainLayout({
    children,
    params: { domain, language },
}: PropsWithChildren<{ params: { domain: string; language: string } }>) {
    setNotFoundContext({ domain, language });
    const isDraftModeEnabled = draftMode().isEnabled;

    return (
        <Layout domain={domain} language={language}>
            {isDraftModeEnabled ? <SitePreviewProvider>{children}</SitePreviewProvider> : children}
        </Layout>
    );
}
