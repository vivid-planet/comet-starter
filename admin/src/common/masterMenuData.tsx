import { Assets, Dashboard, Data, Domain, PageTree, Snips, Wrench } from "@comet/admin-icons";
import {
    AllCategories,
    ContentScopeIndicator,
    createRedirectsPage,
    DamPage,
    MasterMenuData,
    PagesPage,
    PublisherPage,
    UserPermissionsPage,
} from "@comet/cms-admin";
import { DashboardPage } from "@src/dashboard/DashboardPage";
import { Link } from "@src/documents/links/Link";
import { Page } from "@src/documents/pages/Page";
import { ProductsPage } from "@src/products/ProductsPage";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ContentScopeIndicatorContent, ContentScopeIndicatorDomain, ContentScopeIndicatorLanguage } from "./ContentScopeIndicatorStyles";

export const pageTreeCategories: AllCategories = [
    {
        category: "MainNavigation",
        label: <FormattedMessage id="menu.pageTree.mainNavigation" defaultMessage="Main navigation" />,
    },
];

export const pageTreeDocumentTypes = {
    Page,
    Link,
};
const RedirectsPage = createRedirectsPage();

export const masterMenuData: MasterMenuData = [
    {
        primary: <FormattedMessage id="menu.dashboard" defaultMessage="Dashboard" />,
        icon: <Dashboard />,
        route: {
            path: "/dashboard",
            component: DashboardPage,
        },
    },
    {
        primary: <FormattedMessage id="menu.pageTree" defaultMessage="Page tree" />,
        icon: <PageTree />,
        route: {
            path: "/pages/pagetree/main-navigation",
            render: () => (
                <PagesPage
                    path="/pages/pagetree/main-navigation"
                    allCategories={pageTreeCategories}
                    documentTypes={pageTreeDocumentTypes}
                    category="MainNavigation"
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
            ),
        },
        requiredPermission: "pageTree",
    },
    {
        primary: <FormattedMessage id="menu.structuredContent" defaultMessage="Structured Content" />,
        icon: <Data />,
        submenu: [
            {
                primary: <FormattedMessage id="menu.products" defaultMessage="Products" />,
                route: {
                    path: "/structured-content/products",
                    component: ProductsPage,
                },
            },
        ],
        requiredPermission: "products",
    },
    {
        primary: <FormattedMessage id="menu.dam" defaultMessage="Assets" />,
        icon: <Assets />,
        route: {
            path: "/assets",
            component: DamPage,
        },
        requiredPermission: "dam",
    },
    {
        primary: <FormattedMessage id="menu.userPermissions" defaultMessage="User Permissions" />,
        icon: <Snips />,
        route: {
            path: "/user-permissions",
            component: UserPermissionsPage,
        },
        requiredPermission: "userPermissions",
    },
    {
        primary: <FormattedMessage id="menu.system" defaultMessage="System" />,
        icon: <Wrench />,
        submenu: [
            {
                primary: <FormattedMessage id="menu.publisher" defaultMessage="Publisher" />,
                route: {
                    path: "/system/publisher",
                    component: PublisherPage,
                },
                requiredPermission: "builds",
            },
            {
                primary: <FormattedMessage id="menu.redirects" defaultMessage="Redirects" />,
                route: {
                    path: "/system/redirects",
                    render: () => <RedirectsPage redirectPathAfterChange="/system/redirects" />,
                },
                requiredPermission: "pageTree",
            },
        ],
        requiredPermission: "pageTree",
    },
];
