import { BuildEntry, ContentScopeControls, Header, UserHeaderItem } from "@comet/cms-admin";

export function MasterHeader() {
    return (
        <Header>
            <ContentScopeControls />
            <BuildEntry />
            <UserHeaderItem />
        </Header>
    );
}
