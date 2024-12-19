"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { CallToActionBlockData } from "@src/blocks.generated";
import { LinkBlock } from "@src/common/blocks/LinkBlock";

import { Button, ButtonVariant } from "../components/Button";
import { HiddenIfInvalidLink } from "../helpers/HiddenIfInvalidLink";

const buttonVariantMap: Record<CallToActionBlockData["variant"], ButtonVariant> = {
    Contained: "contained",
    Outlined: "outlined",
    Text: "text",
};

export const CallToActionBlock = withPreview(
    ({ data: { textLink, variant } }: PropsWithData<CallToActionBlockData>) => (
        <HiddenIfInvalidLink link={textLink.link}>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            <Button as={LinkBlock} data={textLink.link} variant={buttonVariantMap[variant]}>
                {textLink.text}
            </Button>
        </HiddenIfInvalidLink>
    ),
    { label: "Call To Action" },
);
