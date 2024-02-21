import { useMutation, useQuery } from "@apollo/client";
import {
    FinalForm,
    FinalFormSaveSplitButton,
    Loading,
    MainContent,
    TextAreaField,
    TextField,
    Toolbar,
    ToolbarActions,
    ToolbarBackButton,
    ToolbarFillSpace,
} from "@comet/admin";
import { Card, CardContent } from "@mui/material";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { createProductMutation, productQuery, updateProductMutation } from "./ProductForm.gql";
import {
    GQLCreateProductMutation,
    GQLCreateProductMutationVariables,
    GQLProductFormFragment,
    GQLProductQuery,
    GQLProductQueryVariables,
    GQLUpdateProductMutation,
    GQLUpdateProductMutationVariables,
} from "./ProductForm.gql.generated";

type FormValues = GQLProductFormFragment;

const useSubmitMutation = (id?: string) => {
    const [create] = useMutation<GQLCreateProductMutation, GQLCreateProductMutationVariables>(createProductMutation);
    const [update] = useMutation<GQLUpdateProductMutation, GQLUpdateProductMutationVariables>(updateProductMutation);

    if (id) {
        return ({ name, description }: FormValues) => {
            return update({ variables: { id, input: { name, description } } });
        };
    }

    return ({ name, description }: FormValues) => {
        return create({ variables: { input: { name, description } } });
    };
};

interface FormProps {
    id?: string;
}

export function ProductForm({ id }: FormProps): React.ReactElement {
    const intl = useIntl();
    const mode = id ? "edit" : "add";

    const submit = useSubmitMutation(id);

    const { data, error, loading } = useQuery<GQLProductQuery, GQLProductQueryVariables>(productQuery, id ? { variables: { id } } : { skip: true });

    if (error) {
        return <FormattedMessage id="common.error" defaultMessage="Something went wrong. Please try again later." />;
    }

    if (loading) {
        return <Loading behavior="fillPageHeight" />;
    }

    const initialValues: Partial<FormValues> = data?.product ?? {};

    return (
        <FinalForm<FormValues> mode={mode} onSubmit={submit} initialValues={initialValues}>
            <Toolbar>
                <ToolbarBackButton />
                <ToolbarFillSpace />
                <ToolbarActions>
                    <FinalFormSaveSplitButton />
                </ToolbarActions>
            </Toolbar>
            <MainContent>
                <Card>
                    <CardContent>
                        <TextField required fullWidth name="name" label={intl.formatMessage({ id: "products.name", defaultMessage: "Name" })} />
                        <TextAreaField
                            required
                            fullWidth
                            name="description"
                            label={intl.formatMessage({ id: "products.description", defaultMessage: "Description" })}
                        />
                    </CardContent>
                </Card>
            </MainContent>
        </FinalForm>
    );
}
