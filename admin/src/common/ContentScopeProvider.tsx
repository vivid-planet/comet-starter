import { Domain as DomainIcon, Language as LanguageIcon } from "@comet/admin-icons";
import {
    ContentScopeConfigProps,
    ContentScopeControls as ContentScopeControlsLibrary,
    ContentScopeControlsConfig,
    ContentScopeProvider as ContentScopeProviderLibrary,
    ContentScopeProviderProps,
    ContentScopeValues,
    useContentScope as useContentScopeLibrary,
    UseContentScopeApi,
    useContentScopeConfig as useContentScopeConfigLibrary,
    useCurrentUser,
} from "@comet/cms-admin";
import { ContentScope } from "@src/config";

// convenince wrapper for app (Bind Generic)
export function useContentScope(): UseContentScopeApi<ContentScope> {
    return useContentScopeLibrary<ContentScope>();
}

const controlsConfig: ContentScopeControlsConfig<ContentScope> = {
    domain: {
        label: "Domain",
        icon: DomainIcon,
    },
    language: {
        label: "Language",
        icon: LanguageIcon,
    },
};

// convenince wrapper for app (Bind config and Generic)
export function ContentScopeControls() {
    return <ContentScopeControlsLibrary<ContentScope> config={controlsConfig} />;
}

export function useContentScopeConfig(p: ContentScopeConfigProps): void {
    return useContentScopeConfigLibrary(p);
}

export const ContentScopeProvider: React.FC<Pick<ContentScopeProviderProps, "children">> = ({ children }) => {
    const user = useCurrentUser();

    const allowedUserDomains = user.allowedContentScopes
        .map((contentScope) => contentScope.domain)
        .filter((value, index, array) => array.indexOf(value) === index);
    const allowedUserLanguages = user.allowedContentScopes
        .map((contentScope) => contentScope.language)
        .filter((value, index, array) => array.indexOf(value) === index);
    const values: ContentScopeValues<ContentScope> = {
        domain: allowedUserDomains.map((value) => ({ value })),
        language: allowedUserLanguages.map((value) => ({ value })),
    };

    return (
        <ContentScopeProviderLibrary<ContentScope> values={values} defaultValue={{ domain: "main", language: "en" }}>
            {children}
        </ContentScopeProviderLibrary>
    );
};
