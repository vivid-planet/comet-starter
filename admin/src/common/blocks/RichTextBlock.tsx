import { createRichTextBlock } from "@comet/cms-admin";
import { Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";

import { LinkBlock } from "./LinkBlock";

export const RichTextBlock = createRichTextBlock({
    link: LinkBlock,
    rte: {
        standardBlockType: "paragraph-standard",
        blocktypeMap: {
            "paragraph-standard": {
                label: <FormattedMessage id="richTextBlock.paragraph-one" defaultMessage="Paragraph Standard" />,
            },
            "paragraph-small": {
                label: <FormattedMessage id="richTextBlock.paragraph-two" defaultMessage="Paragraph Small" />,
                renderConfig: {
                    element: (props) => <Typography paragraph variant="body2" {...props} />,
                },
            },
        },
    },
});
