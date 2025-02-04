import { future_FormConfig as FormConfig } from "@comet/cms-admin";
import { GQLCustomer } from "@src/graphql.generated";

export const CustomerForm: FormConfig<GQLCustomer> = {
    type: "form",
    gqlType: "Customer",
    mode: "all",
    fields: [
        {
            type: "fieldSet",
            name: "info",
            collapsible: false,
            fields: [
                {
                    type: "text",
                    name: "id",
                    readOnly: true,
                },
                {
                    type: "text",
                    name: "firstname",
                },
                {
                    type: "text",
                    name: "lastname",
                },
            ],
        },
    ],
};
