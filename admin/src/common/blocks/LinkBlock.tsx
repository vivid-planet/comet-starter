import { createLinkBlock, ExternalLinkBlock, InternalLinkBlock } from "@comet/cms-admin";

export const LinkBlock = createLinkBlock({
    supportedBlocks: { internal: InternalLinkBlock, external: ExternalLinkBlock },
});
