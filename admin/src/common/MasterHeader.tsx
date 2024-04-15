import { BuildEntry, Header, UserHeaderItem } from "@comet/cms-admin";

import { ContentScopeControls } from "./ContentScopeProvider";

export function MasterHeader() {
    return (
        <Header>
            <ContentScopeControls />
            <BuildEntry />
            <UserHeaderItem />
        </Header>
    );
}
