import { createOneOfBlock, ExternalLinkBlock } from "@comet/blocks-api";
import { InternalLinkBlock } from "@comet/cms-api";

export const LinkBlock = createOneOfBlock(
    { supportedBlocks: { internal: InternalLinkBlock, external: ExternalLinkBlock }, allowEmpty: false },
    "Link",
);
