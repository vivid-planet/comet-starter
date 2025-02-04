import {
    Button,
    FillSpace,
    MainContent,
    SaveBoundary,
    SaveBoundarySaveButton,
    Stack,
    StackLink,
    StackMainContent,
    StackPage,
    StackSwitch,
    StackToolbar,
    ToolbarActions,
    ToolbarAutomaticTitleItem,
    ToolbarBackButton,
} from "@comet/admin";
import { Add, Edit } from "@comet/admin-icons";
import { ContentScopeIndicator } from "@comet/cms-admin";
import { IconButton } from "@mui/material";
import { CustomerForm } from "@src/customers/generated/CustomerForm";
import { CustomersGrid } from "@src/customers/generated/CustomerGrid";
import { FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";

const FormToolbar = () => (
    <StackToolbar scopeIndicator={<ContentScopeIndicator global />}>
        <ToolbarBackButton />
        <ToolbarAutomaticTitleItem />
        <FillSpace />
        <ToolbarActions>
            <SaveBoundarySaveButton />
        </ToolbarActions>
    </StackToolbar>
);

export const CustomerPage: FunctionComponent = () => {
    return (
        <Stack topLevelTitle={<FormattedMessage id="customers" defaultMessage="Customers" />}>
            <StackSwitch>
                <StackPage name="grid">
                    <StackToolbar scopeIndicator={<ContentScopeIndicator global />} />

                    <StackMainContent fullHeight>
                        <CustomersGrid
                            toolbarAction={
                                <Button responsive startIcon={<Add />} component={StackLink} pageName="add" payload="add">
                                    <FormattedMessage id="customers.newCustomer" defaultMessage="New Customer" />
                                </Button>
                            }
                            rowAction={(params) => (
                                <IconButton color="primary" component={StackLink} pageName="edit" payload={params.row.id}>
                                    <Edit />
                                </IconButton>
                            )}
                            actionsColumnWidth={90}
                        />
                    </StackMainContent>
                </StackPage>

                <StackPage name="edit" title={<FormattedMessage id="customers.editCustomer" defaultMessage="Edit Customer" />}>
                    {(customerId) => (
                        <SaveBoundary>
                            <>
                                <FormToolbar />
                                <StackMainContent>
                                    <CustomerForm id={customerId} />
                                </StackMainContent>
                            </>
                        </SaveBoundary>
                    )}
                </StackPage>

                <StackPage name="add" title={<FormattedMessage id="customer.newCustomer" defaultMessage="Add Customer" />}>
                    <SaveBoundary>
                        <FormToolbar />
                        <MainContent>
                            <CustomerForm />
                        </MainContent>
                    </SaveBoundary>
                </StackPage>
            </StackSwitch>
        </Stack>
    );
};
