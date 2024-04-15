import { gql } from "@apollo/client";
import { Loading, MainContent, RouterPrompt, Toolbar, ToolbarActions, ToolbarFillSpace, ToolbarItem, useStackApi } from "@comet/admin";
import { ArrowLeft, Preview } from "@comet/admin-icons";
import { AdminComponentRoot, AdminTabLabel } from "@comet/blocks-admin";
import {
    BlockPreviewWithTabs,
    createUsePage,
    EditPageLayout,
    openSitePreviewWindow,
    PageName,
    useBlockPreview,
    useCmsBlockContext,
    useSiteConfig,
} from "@comet/cms-admin";
import { Button, IconButton, Stack } from "@mui/material";
import { useContentScope } from "@src/common/ContentScopeProvider";
import { GQLPageTreeNodeCategory } from "@src/graphql.generated";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouteMatch } from "react-router";

import { PageContentBlock } from "./blocks/PageContentBlock";
import { SeoBlock } from "./blocks/SeoBlock";
import { GQLEditPageQuery, GQLEditPageQueryVariables, GQLUpdatePageMutation, GQLUpdatePageMutationVariables } from "./EditPage.generated";

interface Props {
    id: string;
    category: GQLPageTreeNodeCategory;
}

const usePage = createUsePage({
    rootBlocks: {
        content: PageContentBlock,
        seo: SeoBlock,
    },
    pageType: "Page",
})<GQLEditPageQuery, GQLEditPageQueryVariables, GQLUpdatePageMutation["savePage"], GQLUpdatePageMutationVariables>({
    getQuery: gql`
        query EditPage($id: ID!) {
            page: pageTreeNode(id: $id) {
                id
                path
                document {
                    __typename
                    ... on DocumentInterface {
                        id
                        updatedAt
                    }
                    ... on Page {
                        content
                        seo
                    }
                }
            }
        }
    `,
    updateMutation: gql`
        mutation UpdatePage($pageId: ID!, $input: PageInput!, $lastUpdatedAt: DateTime, $attachedPageTreeNodeId: ID) {
            savePage(pageId: $pageId, input: $input, lastUpdatedAt: $lastUpdatedAt, attachedPageTreeNodeId: $attachedPageTreeNodeId) {
                id
                content
                seo
                updatedAt
            }
        }
    `,
});

export const EditPage: React.FC<Props> = ({ id, category }) => {
    const intl = useIntl();
    const { pageState, rootBlocksApi, hasChanges, loading, dialogs, pageSaveButton, handleSavePage } = usePage({
        pageId: id,
    });

    const match = useRouteMatch();
    const stackApi = useStackApi();
    const { match: contentScopeMatch, scope } = useContentScope();
    const siteConfig = useSiteConfig({ scope });
    const previewApi = useBlockPreview();

    const blockContext = useCmsBlockContext();

    let previewState = undefined;

    if (pageState && pageState.document) {
        previewState = PageContentBlock.createPreviewState(pageState.document.content, {
            ...blockContext,
            parentUrl: match.url,
            showVisibleOnly: previewApi.showOnlyVisible,
        });
    }

    if (!pageState) return <></>;

    if (loading) {
        return <Loading behavior="fillPageHeight" />;
    }

    return (
        <EditPageLayout>
            {hasChanges && (
                <RouterPrompt
                    message={(location) => {
                        if (location.pathname.startsWith(match.url)) return true; //we navigated within our self
                        return intl.formatMessage({
                            id: "editPage.discardChanges",
                            defaultMessage: "Discard unsaved changes?",
                        });
                    }}
                    saveAction={async () => {
                        try {
                            await handleSavePage();
                            return true;
                        } catch {
                            return false;
                        }
                    }}
                />
            )}
            <Toolbar>
                <ToolbarItem>
                    <IconButton onClick={stackApi?.goBack} size="large">
                        <ArrowLeft />
                    </IconButton>
                </ToolbarItem>
                <PageName pageId={id} />
                <ToolbarFillSpace />
                <ToolbarActions>
                    <Stack direction="row" spacing={1}>
                        <Button
                            startIcon={<Preview />}
                            disabled={!pageState}
                            onClick={() => {
                                openSitePreviewWindow(pageState.path, contentScopeMatch.url);
                            }}
                            color="info"
                        >
                            <FormattedMessage id="pages.pages.page.edit.preview" defaultMessage="Web preview" />
                        </Button>
                        {pageSaveButton}
                    </Stack>
                </ToolbarActions>
            </Toolbar>
            <MainContent disablePaddingBottom>
                <BlockPreviewWithTabs previewUrl={`${siteConfig.previewUrl}/admin/page`} previewState={previewState} previewApi={previewApi}>
                    {[
                        {
                            key: "content",
                            label: (
                                <AdminTabLabel isValid={rootBlocksApi.content.isValid}>
                                    <FormattedMessage id="generic.blocks" defaultMessage="Blocks" />
                                </AdminTabLabel>
                            ),
                            content: (
                                <AdminComponentRoot
                                    title={intl.formatMessage({ id: "pages.pages.page.edit.pageBlocks.title", defaultMessage: "Page" })}
                                >
                                    {rootBlocksApi.content.adminUI}
                                </AdminComponentRoot>
                            ),
                        },
                        {
                            key: "config",
                            label: (
                                <AdminTabLabel isValid={rootBlocksApi.seo.isValid}>
                                    <FormattedMessage id="pages.pages.page.edit.config" defaultMessage="Config" />{" "}
                                </AdminTabLabel>
                            ),
                            content: rootBlocksApi.seo.adminUI,
                        },
                    ]}
                </BlockPreviewWithTabs>
            </MainContent>
            {dialogs}
        </EditPageLayout>
    );
};
