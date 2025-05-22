import { Layout } from "./Layout";
import { NotFoundClient } from "./NotFoundClient";

interface NotFoundProps {
    scope: {
        domain: string;
        language?: string; // optional, we don't always have a language (eg invalid language)
    }
}
export async function NotFound({ scope }: NotFoundProps) {
    const scopeWithDefaultLanguage = { ...scope, language: scope.language || "en" }; // default to 'en' if no language is provided
    //if (scope) {
        return <Layout scope={scopeWithDefaultLanguage}><NotFoundClient /></Layout>;
    //} else {
    //    return <>404 Not Found</>;
    //}
}
