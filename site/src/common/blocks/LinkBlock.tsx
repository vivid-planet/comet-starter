import {
    DamFileDownloadLinkBlock,
    EmailLinkBlock,
    ExternalLinkBlock,
    InternalLinkBlock,
    OneOfBlock,
    PhoneLinkBlock,
    PropsWithData,
    SupportedBlocks,
    withPreview,
} from "@comet/cms-site";
import { LinkBlockData } from "@src/blocks.generated";
import { ReactElement } from "react";

const supportedBlocks: SupportedBlocks = {
    internal: ({ children, title, ...props }) => (
        <InternalLinkBlock data={props} title={title}>
            {children}
        </InternalLinkBlock>
    ),
    external: ({ children, title, ...props }) => (
        <ExternalLinkBlock data={props} title={title}>
            {children}
        </ExternalLinkBlock>
    ),
    damFileDownload: ({ children, title, ...props }) => (
        <DamFileDownloadLinkBlock data={props} title={title}>
            {children}
        </DamFileDownloadLinkBlock>
    ),
    email: ({ children, title, ...props }) => (
        <EmailLinkBlock data={props} title={title}>
            {children}
        </EmailLinkBlock>
    ),
    phone: ({ children, title, ...props }) => (
        <PhoneLinkBlock data={props} title={title}>
            {children}
        </PhoneLinkBlock>
    ),
};

interface LinkBlockProps extends PropsWithData<LinkBlockData> {
    children: ReactElement;
}

export const LinkBlock = withPreview(
    ({ data, children }: LinkBlockProps) => {
        return (
            <OneOfBlock data={data} supportedBlocks={supportedBlocks}>
                {children}
            </OneOfBlock>
        );
    },
    { label: "Link" },
);
