import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@src/polyfills";

import { ApolloProvider } from "@apollo/client";
import { ErrorDialogHandler, MasterLayout, MuiThemeProvider, RouterBrowserRouter, SnackbarProvider } from "@comet/admin";
import {
    BuildInformationProvider,
    CmsBlockContextProvider,
    createDamFileDependency,
    createHttpClient,
    CurrentUserProvider,
    DependenciesConfigProvider,
    LocaleProvider,
    MasterMenu,
    MasterMenuRoutes,
    SitePreview,
    SitesConfigProvider,
} from "@comet/cms-admin";
import { css, Global } from "@emotion/react";
import { getMessages } from "@src/lang";
import { theme } from "@src/theme";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { DndProvider } from "react-dnd-multi-backend";
import { IntlProvider } from "react-intl";
import { Route, Switch } from "react-router";

import { createApolloClient } from "./common/apollo/createApolloClient";
import { ContentScopeProvider } from "./common/ContentScopeProvider";
import { MasterHeader } from "./common/MasterHeader";
import { masterMenuData, pageTreeCategories, pageTreeDocumentTypes } from "./common/masterMenuData";
import { ConfigProvider, createConfig } from "./config";
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
const apiClient = createHttpClient(config.apiUrl);

export function App() {
    return (
        <ConfigProvider config={config}>
            <ApolloProvider client={apolloClient}>
                <BuildInformationProvider value={{ date: config.buildDate, number: config.buildNumber, commitHash: config.commitSha }}>
                    <SitesConfigProvider
                        value={{
                            configs: config.sitesConfig,
                            resolveSiteConfigForScope: (configs, scope) => {
                                const siteConfig = configs.find((config) => config.contentScope.domain === scope.domain);
                                if (!siteConfig) throw new Error(`siteConfig not found for domain ${scope.domain}`);
                                return {
                                    url: siteConfig.url,
                                    preloginEnabled: siteConfig.preloginEnabled || false,
                                    blockPreviewBaseUrl: `${config.previewUrl}/block-preview`,
                                    sitePreviewApiUrl: `${config.previewUrl}/api/site-preview`,
                                };
                            },
                        }}
                    >
                        <DependenciesConfigProvider
                            entityDependencyMap={{
                                Page,
                                Link,
                                DamFile: createDamFileDependency(),
                            }}
                        >
                            <IntlProvider locale="en" messages={getMessages()}>
                                <LocaleProvider resolveLocaleForScope={(scope) => scope.domain}>
                                    <MuiThemeProvider theme={theme}>
                                        <DndProvider options={HTML5toTouch}>
                                            <SnackbarProvider>
                                                <CmsBlockContextProvider
                                                    damConfig={{
                                                        apiUrl: config.apiUrl,
                                                        apiClient,
                                                        maxFileSize: config.dam.uploadsMaxFileSize,
                                                        maxSrcResolution: config.imgproxy.maxSrcResolution,
                                                        allowedImageAspectRatios: config.dam.allowedImageAspectRatios,
                                                    }}
                                                    pageTreeCategories={pageTreeCategories}
                                                    pageTreeDocumentTypes={pageTreeDocumentTypes}
                                                >
                                                    <ErrorDialogHandler />
                                                    <CurrentUserProvider>
                                                        <RouterBrowserRouter>
                                                            <GlobalStyle />
                                                            <ContentScopeProvider>
                                                                {({ match }) => (
                                                                    <Switch>
                                                                        <Route
                                                                            path={`${match.path}/preview`}
                                                                            render={(props) => <SitePreview {...props} />}
                                                                        />
                                                                        <Route
                                                                            render={() => (
                                                                                <MasterLayout
                                                                                    headerComponent={MasterHeader}
                                                                                    menuComponent={() => <MasterMenu menu={masterMenuData} />}
                                                                                >
                                                                                    <MasterMenuRoutes menu={masterMenuData} />
                                                                                </MasterLayout>
                                                                            )}
                                                                        />
                                                                    </Switch>
                                                                )}
                                                            </ContentScopeProvider>
                                                        </RouterBrowserRouter>
                                                    </CurrentUserProvider>
                                                </CmsBlockContextProvider>
                                            </SnackbarProvider>
                                        </DndProvider>
                                    </MuiThemeProvider>
                                </LocaleProvider>
                            </IntlProvider>
                        </DependenciesConfigProvider>
                    </SitesConfigProvider>
                </BuildInformationProvider>
            </ApolloProvider>
        </ConfigProvider>
    );
}
