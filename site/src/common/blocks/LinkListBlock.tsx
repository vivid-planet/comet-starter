import { PropsWithData, withPreview } from "@comet/cms-site";
import { LinkListBlockData } from "@src/blocks.generated";

import { TextLinkBlock } from "./TextLinkBlock";

export const LinkListBlock = withPreview(
    ({ data: { blocks } }: PropsWithData<LinkListBlockData>) => {
        return (
            <ol>
                {blocks.map((block) => (
                    <li key={block.key}>
                        <TextLinkBlock data={block.props} />
                    </li>
                ))}
            </ol>
        );
    },
    { label: "Link list" },
);
