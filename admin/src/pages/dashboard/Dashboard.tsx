import { gql, useQuery } from "@apollo/client";
import { MainContent, Stack } from "@comet/admin";
import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import backgroundImage1x from "@src/dashboard/dashboard-image@1x.jpg";
import backgroundImage2x from "@src/dashboard/dashboard-image@2x.jpg";
import { DateTime } from "@src/dashboard/DateTime";
import { LatestBuilds } from "@src/dashboard/LatestBuilds";
import { LatestContentUpdates } from "@src/dashboard/LatestContentUpdates";
import { WidgetContainer } from "@src/dashboard/WidgetContainer";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { GQLDashboardCurrentUserQuery, GQLDashboardCurrentUserQueryVariables } from "./Dashboard.generated";

const Header = styled("div")`
    position: relative;
    height: 300px;
    background-image: url(${backgroundImage1x});
    background-size: cover;
    background-position: center;

    @media (min-device-pixel-ratio: 2) {
        background-image: url(${backgroundImage2x});
    }
`;

const Greeting = styled(Typography)`
    position: absolute;
    left: ${({ theme }) => theme.spacing(8)};
    bottom: ${({ theme }) => theme.spacing(8)};
    font-size: 55px;
    line-height: 64px;
    font-weight: 200;
    color: white;
`;

const currentUserQuery = gql`
    query DashboardCurrentUser {
        currentUser {
            name
        }
    }
`;

export const Dashboard: React.FC = () => {
    const intl = useIntl();
    const { data } = useQuery<GQLDashboardCurrentUserQuery, GQLDashboardCurrentUserQueryVariables>(currentUserQuery);

    return (
        <Stack topLevelTitle={intl.formatMessage({ id: "dashboard", defaultMessage: "Dashboard" })}>
            <Header>
                <DateTime />
                <Greeting variant="h1">
                    {data ? (
                        <FormattedMessage
                            id="pages.dashboard.helloUser"
                            defaultMessage="Hallo {givenName}!"
                            values={{ givenName: data.currentUser.name }}
                        />
                    ) : (
                        <FormattedMessage id="pages.dashboard.hello" defaultMessage="Hallo!" />
                    )}
                </Greeting>
            </Header>
            <MainContent>
                <Grid container direction="row" spacing={4}>
                    <WidgetContainer header={<FormattedMessage id="pages.dashboard.latestContentUpdates" defaultMessage="Latest Content Updates" />}>
                        <LatestContentUpdates />
                    </WidgetContainer>
                    {import.meta.env.MODE !== "development" && (
                        <WidgetContainer header={<FormattedMessage id="pages.dashboard.latestBuilds" defaultMessage="Latest Builds" />}>
                            <LatestBuilds />
                        </WidgetContainer>
                    )}
                </Grid>
            </MainContent>
        </Stack>
    );
};
