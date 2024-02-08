import { MasterLayout, RouteWithErrorBoundary } from "@comet/admin";
import { Domain } from "@comet/admin-icons";
import { ContentScopeIndicator, createRedirectsPage, DamPage, PagesPage, PublisherPage, SitePreview } from "@comet/cms-admin";
import { pageTreeCategories, urlParamToCategory } from "@src/pageTree/pageTreeCategories";
import * as React from "react";
import { RouteComponentProps } from "react-router";
import { Redirect, Route, Switch } from "react-router-dom";

import { ContentScopeIndicatorContent, ContentScopeIndicatorDomain, ContentScopeIndicatorLanguage } from "./common/ContentScopeIndicatorStyles";
import { ContentScopeProvider } from "./common/ContentScopeProvider";
import { MasterHeader } from "./common/MasterHeader";
import { MasterMenu } from "./common/MasterMenu";
import { DashboardPage } from "./dashboard/DashboardPage";
import { Link } from "./documents/links/Link";
import { Page } from "./documents/pages/Page";
import { ProductsPage } from "./products/ProductsPage";

const RedirectsPage = createRedirectsPage();

export const Routes: React.FC = () => {
    return (
        <ContentScopeProvider>
            {({ match }) => (
                <Switch>
                    <Route path={`${match.path}/preview`} render={(props) => <SitePreview {...props} />} />
                    <Route
                        render={(props) => (
                            <MasterLayout headerComponent={MasterHeader} menuComponent={MasterMenu}>
                                <Switch>
                                    <RouteWithErrorBoundary path={`${match.path}/dashboard`} component={DashboardPage} />
                                    <RouteWithErrorBoundary
                                        path={`${match.path}/pages/pagetree/:category`}
                                        render={({ match: { params } }: RouteComponentProps<{ category: string }>) => {
                                            const category = urlParamToCategory(params.category);

                                            if (category === undefined) {
                                                return <Redirect to={`${match.url}/dashboard`} />;
                                            }

                                            return (
                                                <PagesPage
                                                    category={category}
                                                    allCategories={pageTreeCategories}
                                                    path={`/pages/pagetree/${params.category}`}
                                                    documentTypes={{ Page, Link }}
                                                    renderContentScopeIndicator={(scope) => (
                                                        <ContentScopeIndicator variant="toolbar">
                                                            <ContentScopeIndicatorContent>
                                                                <Domain fontSize="small" />
                                                                <ContentScopeIndicatorDomain variant="body2" textTransform="uppercase">
                                                                    {scope.domain}
                                                                </ContentScopeIndicatorDomain>
                                                                {" | "}
                                                                <ContentScopeIndicatorLanguage variant="body2" textTransform="uppercase">
                                                                    {scope.language}
                                                                </ContentScopeIndicatorLanguage>
                                                            </ContentScopeIndicatorContent>
                                                        </ContentScopeIndicator>
                                                    )}
                                                />
                                            );
                                        }}
                                    />
                                    <RouteWithErrorBoundary path={`${match.path}/structured-content/products`} component={ProductsPage} />
                                    <RouteWithErrorBoundary path={`${match.path}/assets`} component={DamPage} />
                                    <RouteWithErrorBoundary path={`${match.path}/system/publisher`} component={PublisherPage} />
                                    <RouteWithErrorBoundary
                                        path={`${match.path}/system/redirects`}
                                        render={() => <RedirectsPage redirectPathAfterChange="/system/redirects" />}
                                    />
                                    <Redirect from={`${match.path}`} to={`${match.url}/dashboard`} />
                                </Switch>
                            </MasterLayout>
                        )}
                    />
                </Switch>
            )}
        </ContentScopeProvider>
    );
};
