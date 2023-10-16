import { gql, useQuery } from "@apollo/client";
import { Domain as DomainIcon, Language as LanguageIcon } from "@comet/admin-icons";
import {
    ContentScopeControls as ContentScopeControlsLibrary,
    ContentScopeControlsConfig,
    ContentScopeProvider as ContentScopeProviderLibrary,
    ContentScopeProviderProps,
    ContentScopeValues,
    useSitesConfig,
} from "@comet/cms-admin";
import { CircularProgress } from "@mui/material";
import React from "react";

import { GQLCurrentUserScopeQuery, GQLCurrentUserScopeQueryVariables } from "./ContentScopeProvider.generated";

type Domain = "main" | "secondary" | string;
type Language = "en" | string;
export interface ContentScope {
    domain: Domain;
    language: Language;
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

const currentUserQuery = gql`
    query CurrentUserScope {
        currentUser {
            role
            domains
        }
    }
`;

export const ContentScopeProvider: React.FC<Pick<ContentScopeProviderProps, "children">> = ({ children }) => {
    const sitesConfig = useSitesConfig();
    const { loading, data } = useQuery<GQLCurrentUserScopeQuery, GQLCurrentUserScopeQueryVariables>(currentUserQuery);

    if (loading || !data) return <CircularProgress />;

    const allowedUserDomains = data.currentUser.domains;

    const allowedSiteConfigs = Object.fromEntries(
        Object.entries(sitesConfig.configs).filter(([siteKey, siteConfig]) => (allowedUserDomains ? allowedUserDomains.includes(siteKey) : true)),
    );
    const values: ContentScopeValues<ContentScope> = {
        domain: Object.keys(allowedSiteConfigs).map((key) => ({ value: key })),
        language: [{ label: "English", value: "en" }],
    };

    return (
        <ContentScopeProviderLibrary<ContentScope> values={values} defaultValue={{ domain: "main", language: "en" }}>
            {children}
        </ContentScopeProviderLibrary>
    );
};
