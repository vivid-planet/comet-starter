import "@fontsource-variable/roboto-flex/full.css";
import "@src/polyfills";

import { ApolloProvider } from "@apollo/client";
import { ErrorDialogHandler, MasterLayout, MuiThemeProvider, RouterBrowserRouter, SnackbarProvider } from "@comet/admin";
import {
    CometConfigProvider,
    ContentScopeProvider,
    createDamFileDependency,
    CurrentUserProvider,
    MasterMenuRoutes,
    SitePreview,
} from "@comet/cms-admin";
import { css, Global } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import type { GQLPermission } from "@src/graphql.generated";
import { getMessages } from "@src/lang";
import { pageTreeCategories } from "@src/pageTree/pageTreeCategories";
import { type ContentScope as BaseContentScope } from "@src/site-configs";
import { theme } from "@src/theme";
import { enUS } from "date-fns/locale";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { DndProvider } from "react-dnd-multi-backend";
import { IntlProvider } from "react-intl";
import { Route, Switch } from "react-router";

import { createApolloClient } from "./common/apollo/createApolloClient";
import { MasterHeader } from "./common/MasterHeader";
import { AppMasterMenu, masterMenuData, pageTreeDocumentTypes } from "./common/MasterMenu";
import { createConfig } from "./config";
import { Link } from "./documents/links/Link";
import { Page } from "./documents/pages/Page";

const GlobalStyle = () => (
    <Global
        styles={css`
            body {
                margin: 0;
            }
        `}
    />
);
const config = createConfig();
const apolloClient = createApolloClient(config.apiUrl);

export function App() {
    return (
        <CometConfigProvider
            {...config}
            graphQLApiUrl={`${config.apiUrl}/graphql`}
            pageTree={{
                categories: pageTreeCategories,
                documentTypes: pageTreeDocumentTypes,
            }}
            dependencies={{
                entityDependencyMap: {
                    Page,
                    Link,
                    DamFile: createDamFileDependency(),
                },
            }}
            siteConfigs={{
                configs: config.siteConfigs,
                resolveSiteConfigForScope: (configs, scope) => {
                    const siteConfig = configs.find((config) => {
                        return config.scope.domain === scope.domain;
                    });

                    if (!siteConfig) throw new Error(`siteConfig not found for domain ${scope.domain}`);
                    return {
                        url: siteConfig.url,
                        preloginEnabled: siteConfig.preloginEnabled || false,
                        blockPreviewBaseUrl: `${config.previewUrl}/block-preview/${scope.domain}/${scope.language}`,
                        sitePreviewApiUrl: `${config.previewUrl}/site-preview`,
                    };
                },
            }}
            buildInformation={{ date: config.buildDate, number: config.buildNumber, commitHash: config.commitSha }}
            contentLanguage={{ resolveContentLanguageForScope: (scope) => scope.language }}
            redirects={{ scopeParts: ["domain"] }}
        >
            <ApolloProvider client={apolloClient}>
                <IntlProvider locale="en" messages={getMessages("en")}>
                    <LocalizationProvider adapterLocale={enUS} dateAdapter={AdapterDateFns}>
                        <MuiThemeProvider theme={theme}>
                            <DndProvider options={HTML5toTouch}>
                                <SnackbarProvider>
                                    <ErrorDialogHandler />
                                    <CurrentUserProvider>
                                        <RouterBrowserRouter>
                                            <GlobalStyle />
                                            <ContentScopeProvider>
                                                {({ match }) => (
                                                    <Switch>
                                                        <Route
                                                            path={`${match.path}/preview`}
                                                            render={(props) => (
                                                                <SitePreview
                                                                    resolvePath={(path: string, scope) => {
                                                                        return `/${scope.language}${path}`;
                                                                    }}
                                                                    {...props}
                                                                />
                                                            )}
                                                        />
                                                        <Route
                                                            render={() => (
                                                                <MasterLayout headerComponent={MasterHeader} menuComponent={AppMasterMenu}>
                                                                    <MasterMenuRoutes menu={masterMenuData} />
                                                                </MasterLayout>
                                                            )}
                                                        />
                                                    </Switch>
                                                )}
                                            </ContentScopeProvider>
                                        </RouterBrowserRouter>
                                    </CurrentUserProvider>
                                </SnackbarProvider>
                            </DndProvider>
                        </MuiThemeProvider>
                    </LocalizationProvider>
                </IntlProvider>
            </ApolloProvider>
        </CometConfigProvider>
    );
}

declare module "@comet/cms-admin" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ContentScope extends BaseContentScope {}

    export interface PermissionOverrides {
        permission: GQLPermission;
    }
}
