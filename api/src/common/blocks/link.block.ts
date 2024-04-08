import { ExternalLinkBlock } from "@comet/blocks-api";
import { createLinkBlock, InternalLinkBlock } from "@comet/cms-api";

export const LinkBlock = createLinkBlock({ supportedBlocks: { internal: InternalLinkBlock, external: ExternalLinkBlock } });
