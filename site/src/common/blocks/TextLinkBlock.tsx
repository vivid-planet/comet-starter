import { PropsWithData, withPreview } from "@comet/cms-site";
import { TextLinkBlockData } from "@src/blocks.generated";

import { SvgUse } from "../helpers/SvgUse";
import { LinkBlock } from "./LinkBlock";

export const TextLinkBlock = withPreview(
    ({ data: { link, text } }: PropsWithData<TextLinkBlockData>) => {
        return (
            <LinkBlock data={link}>
                <a>
                    {text} <SvgUse xlinkHref="/chevron.svg#chevron" width={20} height={20} />
                </a>
            </LinkBlock>
        );
    },
    { label: "Text link" },
);
