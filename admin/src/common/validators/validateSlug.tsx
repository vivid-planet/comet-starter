import { type ReactElement } from "react";
import { FormattedMessage } from "react-intl";

const SLUG_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9-_]*$/;

export const validateSlug = (value: string | undefined): ReactElement | undefined => {
    if (!value) return undefined;
    if (!SLUG_PATTERN.test(value)) {
        return (
            <FormattedMessage
                id="validation.slug"
                defaultMessage="Only letters, numbers, hyphens, and underscores allowed. Must start with a letter or number."
            />
        );
    }
    return undefined;
};
