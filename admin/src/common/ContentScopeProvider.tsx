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
    useSitesConfig,
} from "@comet/cms-admin";
import { SitesConfig } from "@src/config";
import { GQLDomain, GQLLanguage } from "@src/graphql.generated";

export interface ContentScope {
    domain: GQLDomain;
    language: GQLLanguage;
}

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
    const sitesConfig = useSitesConfig<SitesConfig>();
    const user = useCurrentUser();

    const allowedUserDomains = user.allowedContentScopes.map((contentScope) => contentScope.domain);

    const allowedSiteConfigs = Object.fromEntries(
        Object.entries(sitesConfig.configs).filter(([siteKey, _siteConfig]) => allowedUserDomains.includes(siteKey)),
    );
    const values: ContentScopeValues<ContentScope> = {
        domain: Object.keys(allowedSiteConfigs).map((key) => ({ value: key as GQLDomain })),
        language: [
            { label: "English", value: "en" },
            { label: "German", value: "de" },
        ],
    };

    return (
        <ContentScopeProviderLibrary<ContentScope> values={values} defaultValue={{ domain: "main", language: "en" }}>
            {children}
        </ContentScopeProviderLibrary>
    );
};
