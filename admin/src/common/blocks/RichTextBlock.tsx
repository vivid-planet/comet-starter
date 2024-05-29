import { createRichTextBlock } from "@comet/cms-admin";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { LinkBlock } from "./LinkBlock";

export const RichTextBlock = createRichTextBlock({
    link: LinkBlock,
    rte: {
        supports: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "sub",
            "sup",
            "header-one",
            "header-two",
            "header-three",
            "header-four",
            "header-five",
            "ordered-list",
            "unordered-list",
            "link",
            "links-remove",
            "non-breaking-space",
            "soft-hyphen",
        ],
        standardBlockType: "paragraph-standard",
        blocktypeMap: {
            "paragraph-standard": {
                label: <FormattedMessage id="richTextBlock.paragraph-one" defaultMessage="Paragraph Standard" />,
            },
            "paragraph-small": {
                label: <FormattedMessage id="richTextBlock.paragraph-two" defaultMessage="Paragraph Small" />,
                renderConfig: {
                    element: (p) => <Typography paragraph variant="body2" {...p} />,
                },
            },
        },
    },
});
