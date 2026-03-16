import { Chip } from "@mui/material";
import { ChipIcon } from "@src/common/components/enums/chipIcon/ChipIcon";
import { EnumChip, type EnumChipProps } from "@src/common/components/enums/enumChip/EnumChip";
import { type GQLCollectionType } from "@src/graphql.generated";
import { CollectionType, collectionTypeFormattedMessageMap } from "@src/products/components/collectionType/CollectionType";
import { type FunctionComponent } from "react";

type CollectionTypeChipProps = Pick<EnumChipProps<GQLCollectionType>, "loading" | "onSelectItem" | "value">;

const collectionTypeSortOrder: GQLCollectionType[] = ["Manual", "Seasonal", "Featured", "Sale"];

export const CollectionTypeChip: FunctionComponent<CollectionTypeChipProps> = ({ loading, onSelectItem, value }) => {
    return (
        <EnumChip<GQLCollectionType>
            chipMap={{
                Manual: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="default"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<CollectionType value="Manual" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
                Seasonal: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="info"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<CollectionType value="Seasonal" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
                Featured: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="primary"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<CollectionType value="Featured" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
                Sale: (chipProps) => (
                    <Chip
                        clickable={!!chipProps.onClick}
                        color="error"
                        icon={<ChipIcon loading={chipProps.loading} onClick={chipProps.onClick} />}
                        label={<CollectionType value="Sale" />}
                        onClick={chipProps.onClick}
                        variant="filled"
                    />
                ),
            }}
            formattedMessageMap={collectionTypeFormattedMessageMap}
            loading={loading}
            onSelectItem={onSelectItem}
            sortOrder={collectionTypeSortOrder}
            value={value}
        />
    );
};
