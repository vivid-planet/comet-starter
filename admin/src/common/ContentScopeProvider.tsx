import {
    ContentScopeConfigProps,
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

type Domain = "main" | "secondary" | string;
type Language = "en" | string;
export interface ContentScope {
    domain: Domain;
    language: Language;
}

// convenince wrapper for app (Bind Generic)
export function useContentScope(): UseContentScopeApi<ContentScope> {
    return useContentScopeLibrary<ContentScope>();
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
    const values: ContentScopeValues<ContentScope> = Object.keys(allowedSiteConfigs).flatMap((key) => {
        return [
            { domain: { value: key }, language: { label: "English", value: "en" } },
            { domain: { value: key }, language: { label: "German", value: "de" } },
        ];
    });

    return (
        <ContentScopeProviderLibrary<ContentScope> values={values} defaultValue={{ domain: "main", language: "en" }}>
            {children}
        </ContentScopeProviderLibrary>
    );
};
