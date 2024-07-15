"use client";
import { PropsWithData, withPreview } from "@comet/cms-site";
import { HeadingBlockData, StageBlockData } from "@src/blocks.generated";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { PageLayout } from "@src/layout/PageLayout";
import { CSSProperties } from "react";
import styled from "styled-components";

const alignmentMap: Record<HeadingBlockData["textAlignment"], CSSProperties["alignItems"]> = {
    Left: "left",
    Center: "center",
};

export const StageBlock = withPreview(
    ({ data: { media, heading, text, callToActionList } }: PropsWithData<StageBlockData>) => (
        <Root>
            <MediaPhone>
                <MediaBlock data={media} aspectRatio="1x2" />
            </MediaPhone>
            <MediaTablet>
                <MediaBlock data={media} aspectRatio="1x1" />
            </MediaTablet>
            <MediaTabletLandscape>
                <MediaBlock data={media} aspectRatio="3x2" />
            </MediaTabletLandscape>
            <MediaDesktop>
                <MediaBlock data={media} aspectRatio="16x9" />
            </MediaDesktop>
            <AbsoluteGridRoot grid>
                <Content $alignItems={alignmentMap[heading.textAlignment]}>
                    <HeadingBlock data={heading} />
                    <RichTextBlock data={text} />
                    {callToActionList.blocks.length > 0 && <CallToActionListBlock data={callToActionList} />}
                </Content>
            </AbsoluteGridRoot>
        </Root>
    ),
    { label: "Stage" },
);

const Root = styled(PageLayout)`
    position: relative;
    overflow: hidden;
`;

const AbsoluteGridRoot = styled(PageLayout)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const Content = styled.div<{ $alignItems: CSSProperties["alignItems"] }>`
    grid-column: 3 / -3;
    padding: ${({ theme }) => theme.spacing.D200} 0;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: ${({ $alignItems }) => $alignItems};
`;

// TODO: should this be default behavior? -> move to library?
const BaseMedia = styled.div`
    img {
        object-fit: cover;
    }

    video {
        height: 100%;
    }

    div {
        width: 100%;
        height: 100%;
    }
`;

const MediaPhone = styled(BaseMedia)`
    height: 800px;

    ${({ theme }) => theme.breakpoints.xs.mediaQuery} {
        display: none;
    }
`;

const MediaTablet = styled(BaseMedia)`
    display: none;
    height: 700px;

    ${({ theme }) => theme.breakpoints.xs.mediaQuery} {
        display: block;
    }

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        display: none;
    }
`;

const MediaTabletLandscape = styled(BaseMedia)`
    display: none;
    height: 650px;

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        display: block;
    }

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        display: none;
    }
`;

const MediaDesktop = styled(BaseMedia)`
    display: none;
    height: 750px;

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        display: block;
    }

    ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
        height: 800px;
    }
`;
