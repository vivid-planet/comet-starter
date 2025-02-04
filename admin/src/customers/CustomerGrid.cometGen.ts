import { future_GridConfig as GridConfig } from "@comet/cms-admin";
import { GQLCustomer } from "@src/graphql.generated";

export const CustomerGrid: GridConfig<GQLCustomer> = {
    type: "grid",
    gqlType: "Customer",
    toolbarActionProp: true,
    rowActionProp: true,
    columns: [
        { type: "text", name: "id" },
        { type: "text", name: "firstname" },
        { type: "text", name: "lastname" },
    ],
};
