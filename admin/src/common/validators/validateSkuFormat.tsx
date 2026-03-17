import { type ReactElement } from "react";
import { FormattedMessage } from "react-intl";

const SKU_PATTERN = /^[A-Z]{2,4}-[0-9]{4,8}$/;

export const validateSkuFormat = (value: string | undefined): ReactElement | undefined => {
    if (!value) return undefined;
    if (!SKU_PATTERN.test(value)) {
        return (
            <FormattedMessage
                id="validation.skuFormat"
                defaultMessage="SKU must match format: 2-4 uppercase letters, hyphen, 4-8 digits (e.g. AB-1234)"
            />
        );
    }
    return undefined;
};
