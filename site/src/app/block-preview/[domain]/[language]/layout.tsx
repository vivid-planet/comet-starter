import Layout from "@src/layout/layout";
import { PropsWithChildren } from "react";

export default async function BlockPreviewLayout({
    children,
    params: { domain, language },
}: PropsWithChildren<{ params: { domain: string; language: string } }>) {
    return (
        <Layout language={language} domain={domain} isPreview={true}>
            {children}
        </Layout>
    );
}
