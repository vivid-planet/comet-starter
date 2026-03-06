"use client";
import {
    DamFileDownloadLinkBlock,
    EmailLinkBlock,
    ExternalLinkBlock,
    OneOfBlock,
    PhoneLinkBlock,
    type PropsWithData,
    type SupportedBlocks,
    withPreview,
} from "@comet/site-nextjs";
import { type LinkBlockData } from "@src/blocks.generated";
import { type AnchorHTMLAttributes, type PropsWithChildren } from "react";

import { InternalLinkBlock } from "./InternalLinkBlock";

interface LinkBlockProps extends PropsWithChildren<PropsWithData<LinkBlockData>>, Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {}

export const LinkBlock = withPreview(
    ({ data, children, ...anchorProps }: LinkBlockProps) => {
        const supportedBlocks: SupportedBlocks = {
            internal: ({ children, className, ...props }) => (
                <InternalLinkBlock data={props} className={className} {...anchorProps}>
                    {children}
                </InternalLinkBlock>
            ),
            external: ({ children, className, ...props }) => (
                <ExternalLinkBlock data={props} className={className} {...anchorProps}>
                    {children}
                </ExternalLinkBlock>
            ),
            damFileDownload: ({ children, className, ...props }) => (
                <DamFileDownloadLinkBlock data={props} className={className} {...anchorProps}>
                    {children}
                </DamFileDownloadLinkBlock>
            ),
            email: ({ children, className, ...props }) => (
                <EmailLinkBlock data={props} className={className} {...anchorProps}>
                    {children}
                </EmailLinkBlock>
            ),
            phone: ({ children, className, ...props }) => (
                <PhoneLinkBlock data={props} className={className} {...anchorProps}>
                    {children}
                </PhoneLinkBlock>
            ),
        };

        return (
            <OneOfBlock data={data} supportedBlocks={supportedBlocks} {...anchorProps}>
                {children}
            </OneOfBlock>
        );
    },
    { label: "Link" },
);
