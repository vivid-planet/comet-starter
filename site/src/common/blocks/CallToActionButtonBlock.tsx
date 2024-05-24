"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { CallToActionButtonBlockData } from "@src/blocks.generated";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { HiddenIfInvalidLink } from "@src/common/helpers/HiddenIfInvalidLink";
import { Button } from "@src/components/common/Button";

export const CallToActionButtonBlock = withPreview(
    ({ data: { textLink, variant } }: PropsWithData<CallToActionButtonBlockData>) => (
        <HiddenIfInvalidLink link={textLink.link}>
            <LinkBlock data={textLink.link}>
                <Button variant={variant}>{textLink.text}</Button>
            </LinkBlock>
        </HiddenIfInvalidLink>
    ),
    { label: "Button" },
);
