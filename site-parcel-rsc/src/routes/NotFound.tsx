import { Layout } from "./Layout";

interface NotFoundProps {
    domain?: string;
    language?: string; // optional, we don't always have a language (eg invalid language)
}
export async function NotFound({ domain, language }: NotFoundProps) {
    if (domain && language) {
        return <Layout domain={domain} language={language}>404 Not Found</Layout>;
    } else {
        return <>404 Not Found</>;
    }
}
