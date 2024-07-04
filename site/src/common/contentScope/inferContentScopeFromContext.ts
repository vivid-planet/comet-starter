import { defaultLanguage, domain } from "@src/config";
import { GQLDomain, GQLLanguage } from "@src/graphql.generated";
import { GetServerSidePropsContext, GetStaticPropsContext } from "next";

import { ContentScope } from "./ContentScope";

function inferContentScopeFromContext(context: GetStaticPropsContext | GetServerSidePropsContext): ContentScope {
    if (typeof context.params?.domain === "string" && typeof context.params?.language === "string") {
        // Site preview
        return { domain: context.params.domain as GQLDomain, language: context.params.language as GQLLanguage };
    } else {
        // Live site
        const language = (context.locale as GQLLanguage) ?? defaultLanguage;
        return { domain, language };
    }
}

export { inferContentScopeFromContext };
