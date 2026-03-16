import { createTranslatableEnum } from "@src/common/components/enums/createTranslatableEnum/createTranslatableEnum";
import { type GQLCollectionType } from "@src/graphql.generated";
import { defineMessage } from "react-intl";

const {
    messageDescriptorMap,
    formattedMessageMap,
    Component: CollectionType,
} = createTranslatableEnum<GQLCollectionType>({
    Manual: defineMessage({ defaultMessage: "Manual", id: "products.collectionType.manual" }),
    Seasonal: defineMessage({ defaultMessage: "Seasonal", id: "products.collectionType.seasonal" }),
    Featured: defineMessage({ defaultMessage: "Featured", id: "products.collectionType.featured" }),
    Sale: defineMessage({ defaultMessage: "Sale", id: "products.collectionType.sale" }),
});

export { CollectionType, formattedMessageMap as collectionTypeFormattedMessageMap, messageDescriptorMap as collectionTypeMessageDescriptorMap };
