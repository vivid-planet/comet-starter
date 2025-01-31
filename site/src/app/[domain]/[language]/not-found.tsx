import NotFoundContent from "@src/documents/NotFound";
import Layout from "@src/layout/layout";
import { getNotFoundContext } from "@src/util/NotFoundContext";

export default async function NotFound() {
    const { domain, language } = getNotFoundContext() || { domain: "main", language: "en" };

    return (
        <Layout domain={domain} language={language}>
            <main>
                <NotFoundContent scope={{ domain, language }} />
            </main>
        </Layout>
    );
}
