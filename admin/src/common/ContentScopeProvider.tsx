import {
    ContentScopeProvider as ContentScopeProviderLibrary,
    type ContentScopeProviderProps,
    type ContentScopeValues,
    useContentScope as useContentScopeLibrary,
    type UseContentScopeApi,
    useCurrentUser,
} from "@comet/cms-admin";
import { type ContentScope } from "@src/site-configs";

// convenience wrapper for app (Bind Generic)
export function useContentScope(): UseContentScopeApi<ContentScope> {
    return useContentScopeLibrary<ContentScope>();
}

export const ContentScopeProvider = ({ children }: Pick<ContentScopeProviderProps, "children">) => {
    const user = useCurrentUser();

    // TODO in COMET: filter already in API, avoid type cast, support labels
    const userContentScopes = user.allowedContentScopes.filter(
        (value, index, self) => self.map((x) => JSON.stringify(x)).indexOf(JSON.stringify(value)) == index,
    ) as ContentScope[];

    const values: ContentScopeValues<ContentScope> = userContentScopes.map((contentScope) => ({
        domain: { value: contentScope.domain },
        language: { value: contentScope.language, label: contentScope.language.toUpperCase() },
    }));

    if (user.allowedContentScopes.length === 0) {
        throw new Error("User does not have access to any scopes.");
    }

    return (
        <ContentScopeProviderLibrary<ContentScope> values={values} defaultValue={userContentScopes[0]}>
            {children}
        </ContentScopeProviderLibrary>
    );
};
