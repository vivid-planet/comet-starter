import { gql, useMutation, useQuery } from "@apollo/client";
import { MainContent, messages, SaveButton, SplitButton, Stack, Toolbar, ToolbarActions, ToolbarFillSpace, ToolbarTitleItem } from "@comet/admin";
import { Domain, Save } from "@comet/admin-icons";
import { AdminComponentRoot, BlockState } from "@comet/blocks-admin";
import {
    BlockPreviewWithTabs,
    ContentScopeIndicator,
    EditPageLayout,
    resolveHasSaveConflict,
    useBlockPreview,
    useCmsBlockContext,
    useContentScopeConfig,
    useSaveConflictQuery,
    useSiteConfig,
} from "@comet/cms-admin";
import { FooterContentBlockInput } from "@src/blocks.generated";
import { ContentScopeIndicatorContent, ContentScopeIndicatorDomain, ContentScopeIndicatorLanguage } from "@src/common/ContentScopeIndicatorStyles";
import { useContentScope } from "@src/common/ContentScopeProvider";
import isEqual from "lodash.isequal";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useRouteMatch } from "react-router";

import { FooterContentBlock } from "./blocks/FooterContentBlock";
import {
    GQLCheckForChangesFooterQuery,
    GQLCheckForChangesFooterQueryVariables,
    GQLFooterQuery,
    GQLFooterQueryVariables,
    GQLSaveFooterMutation,
    GQLSaveFooterMutationVariables,
} from "./EditFooterPage.generated";

export function EditFooterPage(): JSX.Element | null {
    const { scope } = useContentScope();
    const siteConfig = useSiteConfig({ scope });
    const [footerState, setFooterState] = React.useState<BlockState<typeof FooterContentBlock>>();
    const [hasChanges, setHasChanges] = React.useState(false);
    const [referenceContent, setReferenceContent] = React.useState<FooterContentBlockInput | null>(null);
    const match = useRouteMatch();
    const previewApi = useBlockPreview();
    const blockContext = useCmsBlockContext();

    useContentScopeConfig({ redirectPathAfterChange: "/project-snips/footer" });

    const { data, refetch } = useQuery<GQLFooterQuery, GQLFooterQueryVariables>(footerQuery, {
        variables: {
            contentScope: scope,
        },
    });

    const saveConflict = useSaveConflictQuery<GQLCheckForChangesFooterQuery, GQLCheckForChangesFooterQueryVariables>(
        checkForChangesQuery,
        {
            variables: {
                scope,
            },
            resolveHasConflict: (checkForChangesData) => {
                return resolveHasSaveConflict(data?.footer?.updatedAt, checkForChangesData?.footer?.updatedAt);
            },
        },
        {
            hasChanges,
            loadLatestVersion: async () => {
                await refetch();
            },
            onDiscardButtonPressed: async () => {
                await refetch();
            },
        },
    );

    const [update, { loading: saving, error: hasSaveErrors }] = useMutation<GQLSaveFooterMutation, GQLSaveFooterMutationVariables>(
        saveFooterMutation,
    );

    React.useEffect(() => {
        if (data) {
            if (data.footer) {
                // @ts-expect-error type mismatch between createCompositeBlock and FooterContentBlockData, needs to be fixed in Comet
                const content = FooterContentBlock.input2State(data.footer.content);
                setFooterState(content);
                setReferenceContent(FooterContentBlock.state2Output(content));
            } else {
                const state = FooterContentBlock.defaultValues();
                setFooterState(state);
                setReferenceContent(FooterContentBlock.state2Output(state));
            }
        }
    }, [data]);

    React.useEffect(() => {
        const equal = isEqual(referenceContent, footerState ? FooterContentBlock.state2Output(footerState) : null);
        setHasChanges(!equal);
    }, [footerState, referenceContent]);

    if (!footerState) {
        return null;
    }

    const handleSavePage = async () => {
        const hasSaveConflict = await saveConflict.checkForConflicts();
        if (hasSaveConflict) {
            return; // dialogs open for the user to handle the conflict
        }

        const input = {
            content: FooterContentBlock.state2Output(footerState),
        };
        return update({
            variables: {
                input,
                scope,
                lastUpdatedAt: data?.footer?.updatedAt ?? "",
            },
        });
    };

    const tabs = [
        {
            key: "content",
            label: <FormattedMessage {...messages.content} />,
            content: (
                <AdminComponentRoot>
                    <FooterContentBlock.AdminComponent state={footerState} updateState={setFooterState} />
                </AdminComponentRoot>
            ),
        },
    ];

    const previewState = FooterContentBlock.createPreviewState(footerState, {
        ...blockContext,
        parentUrl: match.url,
        showVisibleOnly: previewApi.showOnlyVisible,
    });

    return (
        <Stack topLevelTitle={null}>
            <EditPageLayout>
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
                <Toolbar>
                    <ToolbarTitleItem>
                        <FormattedMessage id="footers.edit.toolbarTitle" defaultMessage="Edit footer" />
                    </ToolbarTitleItem>
                    <ToolbarFillSpace />
                    <ToolbarActions>
                        <SplitButton disabled={!hasChanges}>
                            <SaveButton
                                color="primary"
                                variant="contained"
                                saving={saving}
                                hasErrors={hasSaveErrors != null}
                                onClick={handleSavePage}
                                startIcon={<Save />}
                            >
                                <FormattedMessage {...messages.save} />
                            </SaveButton>
                        </SplitButton>
                    </ToolbarActions>
                </Toolbar>
                <MainContent disablePaddingBottom>
                    <BlockPreviewWithTabs previewUrl={`${siteConfig.previewUrl}/admin/footer`} previewState={previewState} previewApi={previewApi}>
                        {tabs}
                    </BlockPreviewWithTabs>
                </MainContent>
            </EditPageLayout>
            {saveConflict.dialogs}
        </Stack>
    );
}

const footerQuery = gql`
    query Footer($contentScope: FooterContentScopeInput!) {
        footer(scope: $contentScope) {
            id
            content
            scope {
                domain
                language
            }
            updatedAt
        }
    }
`;

const saveFooterMutation = gql`
    mutation SaveFooter($lastUpdatedAt: DateTime, $input: FooterInput!, $scope: FooterContentScopeInput!) {
        saveFooter(lastUpdatedAt: $lastUpdatedAt, input: $input, scope: $scope) {
            id
            content
            updatedAt
        }
    }
`;

const checkForChangesQuery = gql`
    query CheckForChangesFooter($scope: FooterContentScopeInput!) {
        footer(scope: $scope) {
            updatedAt
        }
    }
`;
