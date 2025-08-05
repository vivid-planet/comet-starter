import NotFoundContent from "@src/documents/NotFound";
import { getNotFoundContext } from "@src/util/ServerContext";

export default async function NotFound() {
    const { domain, language } = getNotFoundContext() || { domain: "main", language: "en" };

    return (
        <main>
            <NotFoundContent scope={{ domain, language }} />
        </main>
    );
}
