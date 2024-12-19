"use client";
import { ListBlock, PropsWithData, withPreview } from "@comet/cms-site";
import { CallToActionListBlockData } from "@src/blocks.generated";
import { CallToActionBlock } from "@src/common/blocks/CallToActionBlock";
import { breakpoints, spacing } from "@src/constants.yak";
import { styled } from "next-yak";

type CallToActionListBlockProps = PropsWithData<CallToActionListBlockData>;

export const CallToActionListBlock = withPreview(
    ({ data }: CallToActionListBlockProps) =>
        data.blocks.length > 0 ? (
            <Root>
                <ListBlock data={data} block={(block) => <CallToActionBlock data={block} />} />
            </Root>
        ) : null,
    { label: "Call To Action List" },
);

const Root = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: ${spacing.S300};

    ${breakpoints.sm} {
        gap: ${spacing.S400};
    }
`;
