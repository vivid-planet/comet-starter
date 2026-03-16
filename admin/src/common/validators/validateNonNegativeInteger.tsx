import { type ReactElement } from "react";
import { FormattedMessage } from "react-intl";

export const validateNonNegativeInteger = (value: number | undefined): ReactElement | undefined => {
    if (value == null) return undefined;
    if (!Number.isInteger(value) || value < 0) {
        return <FormattedMessage id="validation.nonNegativeInteger" defaultMessage="Value must be zero or a positive whole number" />;
    }
    return undefined;
};
