import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "material-design-icons/iconfont/material-icons.css";
import "@src/polyfills";

import { ApolloProvider } from "@apollo/client";
import { ErrorDialogHandler, MasterLayout, MuiThemeProvider, RouterBrowserRouter, SnackbarProvider } from "@comet/admin";
import {
    BuildInformationProvider,
    CmsBlockContextProvider,
    createHttpClient,
    CurrentUserProvider,
    LocaleProvider,
    MasterMenu,
    MasterMenuRoutes,
    SiteConfig,
    SitePreview,
    SitesConfigProvider,
} from "@comet/cms-admin";
import { css, Global } from "@emotion/react";
import { ContentScope } from "@src/common/ContentScopeProvider";
import { getMessages } from "@src/lang";
import { theme } from "@src/theme";
import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { IntlProvider } from "react-intl";
import { Route, Switch } from "react-router";

import { createApolloClient } from "./common/apollo/createApolloClient";
import { ContentScopeProvider } from "./common/ContentScopeProvider";
import { MasterHeader } from "./common/MasterHeader";
import { masterMenuData, pageTreeCategories, pageTreeDocumentTypes } from "./common/masterMenuData";
import { createConfig } from "./config";

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
        <ApolloProvider client={apolloClient}>
            <CurrentUserProvider>
                <BuildInformationProvider value={{ date: config.buildDate, number: config.buildNumber, commitHash: config.commitSha }}>
                    <SitesConfigProvider
                        value={{
                            configs: config.sitesConfig,
                            resolveSiteConfigForScope: (configs: Record<string, SiteConfig>, scope: ContentScope) => {
                                const siteConfig = configs[scope.domain];
                                return {
                                    ...siteConfig,
                                    previewUrl: `${siteConfig.previewUrl}/${scope.language}`,
                                };
                            },
                        }}
                    >
                        <IntlProvider locale="en" messages={getMessages()}>
                            <LocaleProvider resolveLocaleForScope={(scope: ContentScope) => scope.domain}>
                                <MuiThemeProvider theme={theme}>
                                    <DndProvider backend={HTML5Backend}>
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
                                                    <ErrorDialogHandler />
                                                </RouterBrowserRouter>
                                            </CmsBlockContextProvider>
                                        </SnackbarProvider>
                                    </DndProvider>
                                </MuiThemeProvider>
                            </LocaleProvider>
                        </IntlProvider>
                    </SitesConfigProvider>
                </BuildInformationProvider>
            </CurrentUserProvider>
        </ApolloProvider>
    );
}
