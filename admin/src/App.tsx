import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "material-design-icons/iconfont/material-icons.css";

import { ApolloProvider } from "@apollo/client";
import { ErrorDialogHandler, MuiThemeProvider, RouterBrowserRouter, SnackbarProvider } from "@comet/admin";
import {
    AllCategories,
    BuildInformationProvider,
    CmsBlockContextProvider,
    createHttpClient,
    LocaleProvider,
    SiteConfig,
    SitesConfigProvider,
} from "@comet/cms-admin";
import { css, Global } from "@emotion/react";
import { ContentScope } from "@src/common/ContentScopeProvider";
import { getMessages } from "@src/lang";
import { theme } from "@src/theme";
import * as React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FormattedMessage, IntlProvider } from "react-intl";

import { createApolloClient } from "./common/apollo/createApolloClient";
import { createConfig } from "./config";
import { Link } from "./documents/links/Link";
import { Page } from "./documents/pages/Page";
import { Routes } from "./Routes";

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

const categories: AllCategories = [
    {
        category: "MainNavigation",
        label: <FormattedMessage id="menu.pageTree.mainNavigation" defaultMessage="Main navigation" />,
    },
];

const pageTreeDocumentTypes = {
    Page,
    Link,
};

export function App() {
    return (
        <ApolloProvider client={apolloClient}>
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
                    <IntlProvider locale="en" defaultLocale="en" messages={getMessages()}>
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
                                            pageTreeCategories={categories}
                                            pageTreeDocumentTypes={pageTreeDocumentTypes}
                                        >
                                            <RouterBrowserRouter>
                                                <GlobalStyle />
                                                <Routes />
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
        </ApolloProvider>
    );
}
