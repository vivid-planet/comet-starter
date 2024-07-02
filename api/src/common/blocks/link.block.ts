import { ExternalLinkBlock } from "@comet/blocks-api";
import { createLinkBlock, DamFileDownloadLinkBlock, EmailLinkBlock, InternalLinkBlock, PhoneLinkBlock } from "@comet/cms-api";

export const LinkBlock = createLinkBlock({
    supportedBlocks: {
        internal: InternalLinkBlock,
        external: ExternalLinkBlock,
        damFileDownload: DamFileDownloadLinkBlock,
        email: EmailLinkBlock,
        phone: PhoneLinkBlock,
    },
});
