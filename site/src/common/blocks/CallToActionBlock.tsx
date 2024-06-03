"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { CallToActionBlockData } from "@src/blocks.generated";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { HiddenIfInvalidLink } from "@src/common/helpers/HiddenIfInvalidLink";
import { Button } from "@src/components/common/Button";

export const CallToActionBlock = withPreview(
    ({ data: { textLink, variant } }: PropsWithData<CallToActionBlockData>) => (
        <HiddenIfInvalidLink link={textLink.link}>
            <LinkBlock data={textLink.link}>
                <Button variant={variant}>{textLink.text}</Button>
            </LinkBlock>
        </HiddenIfInvalidLink>
    ),
    { label: "Call To Action" },
);
