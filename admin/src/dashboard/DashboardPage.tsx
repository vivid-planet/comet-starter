import { MainContent, Stack, Toolbar } from "@comet/admin";
import { ContentScopeIndicator, DashboardHeader } from "@comet/cms-admin";
import { Grid } from "@mui/material";
import { useIntl } from "react-intl";

import backgroundImage1x from "./dashboard-image@1x.jpg";
import backgroundImage2x from "./dashboard-image@2x.jpg";
import { LatestContentUpdates } from "./LatestContentUpdates";

export function DashboardPage() {
    const intl = useIntl();

    return (
        <Stack topLevelTitle={intl.formatMessage({ id: "dashboard", defaultMessage: "Dashboard" })}>
            <DashboardHeader
                backgroundImageUrl={{
                    "1x": backgroundImage1x,
                    "2x": backgroundImage2x,
                }}
            />
            <Toolbar scopeIndicator={<ContentScopeIndicator />} />
            <MainContent>
                <Grid container direction="row" spacing={4}>
                    <LatestContentUpdates />
                </Grid>
            </MainContent>
        </Stack>
    );
}
