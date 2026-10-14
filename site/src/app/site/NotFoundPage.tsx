import { NotFoundContent } from "@src/documents/NotFound";

export function NotFoundPage({ domain, language }: { domain: string; language: string }) {
    return (
        <main>
            <NotFoundContent scope={{ domain, language }} />
        </main>
    );
}
