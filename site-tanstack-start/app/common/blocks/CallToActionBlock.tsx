"use client";
import { type PropsWithData, withPreview } from "@comet/cms-site";
import { type CallToActionBlockData } from "@app/blocks.generated";
import { LinkBlock } from "@app/common/blocks/LinkBlock";

import { Button, type ButtonVariant } from "../components/Button";
import { HiddenIfInvalidLink } from "../helpers/HiddenIfInvalidLink";

const buttonVariantMap: Record<CallToActionBlockData["variant"], ButtonVariant> = {
    Contained: "contained",
    Outlined: "outlined",
    Text: "text",
};

export const CallToActionBlock = withPreview(
    ({ data: { textLink, variant } }: PropsWithData<CallToActionBlockData>) => (
        <HiddenIfInvalidLink link={textLink.link}>
            <Button as={LinkBlock} data={textLink.link} variant={buttonVariantMap[variant]}>
                {textLink.text}
            </Button>
        </HiddenIfInvalidLink>
    ),
    { label: "Call To Action" },
);
