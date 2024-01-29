import { gql, useQuery } from "@apollo/client";
import { Loading } from "@comet/admin";
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
    useSitesConfig,
} from "@comet/cms-admin";
import { SitesConfig } from "@src/config";
import React from "react";

import { GQLCurrentUserScopeQuery, GQLCurrentUserScopeQueryVariables } from "./ContentScopeProvider.generated";

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
export const ContentScopeControls: React.FC = () => {
    return <ContentScopeControlsLibrary<ContentScope> config={controlsConfig} />;
};

export function useContentScopeConfig(p: ContentScopeConfigProps): void {
    return useContentScopeConfigLibrary(p);
}

const currentUserQuery = gql`
    query CurrentUserScope {
        currentUser {
            role
            domains
        }
    }
`;

export const ContentScopeProvider: React.FC<Pick<ContentScopeProviderProps, "children">> = ({ children }) => {
    const sitesConfig = useSitesConfig<SitesConfig>();
    const { loading, data } = useQuery<GQLCurrentUserScopeQuery, GQLCurrentUserScopeQueryVariables>(currentUserQuery);

    if (loading || !data) return <Loading behavior="fillPageHeight" />;

    const allowedUserDomains = data.currentUser.domains;

    const allowedSiteConfigs = Object.fromEntries(
        Object.entries(sitesConfig.configs).filter(([siteKey, siteConfig]) => (allowedUserDomains ? allowedUserDomains.includes(siteKey) : true)),
    );
    const values: ContentScopeValues<ContentScope> = {
        domain: Object.keys(allowedSiteConfigs).map((key) => ({ value: key })),
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
