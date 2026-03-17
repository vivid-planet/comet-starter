import { createTranslatableEnum } from "@src/common/components/enums/createTranslatableEnum/createTranslatableEnum";
import { type GQLProductType } from "@src/graphql.generated";
import { defineMessage } from "react-intl";

const {
    messageDescriptorMap,
    formattedMessageMap,
    Component: ProductType,
} = createTranslatableEnum<GQLProductType>({
    Physical: defineMessage({ defaultMessage: "Physical", id: "products.productType.physical" }),
    Digital: defineMessage({ defaultMessage: "Digital", id: "products.productType.digital" }),
    Subscription: defineMessage({ defaultMessage: "Subscription", id: "products.productType.subscription" }),
});

export { ProductType, formattedMessageMap as productTypeFormattedMessageMap, messageDescriptorMap as productTypeMessageDescriptorMap };
