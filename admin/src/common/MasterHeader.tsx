import { BuildEntry, Header, UserHeaderItem } from "@comet/cms-admin";
import * as React from "react";

import { ContentScopeControls } from "./ContentScopeProvider";

export const MasterHeader: React.FC = () => {
    return (
        <Header>
            <ContentScopeControls />
            <BuildEntry />
            <UserHeaderItem />
        </Header>
    );
};
