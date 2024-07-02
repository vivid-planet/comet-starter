import { createLinkBlock, DamFileDownloadLinkBlock, EmailLinkBlock, ExternalLinkBlock, InternalLinkBlock, PhoneLinkBlock } from "@comet/cms-admin";

export const LinkBlock = createLinkBlock({
    supportedBlocks: {
        internal: InternalLinkBlock,
        external: ExternalLinkBlock,
        damFileDownload: DamFileDownloadLinkBlock,
        email: EmailLinkBlock,
        phone: PhoneLinkBlock,
    },
});
