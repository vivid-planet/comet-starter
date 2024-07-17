import { PropsWithData, withPreview } from "@comet/cms-site";
import { BillboardTeaserBlockData, HeadingBlockData } from "@src/blocks.generated";
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

export const BillboardTeaserBlock = withPreview(
    ({ data: { media, heading, text, backgroundOpacity, callToActionList } }: PropsWithData<BillboardTeaserBlockData>) => (
        <Root>
            <ImageMobile $backgroundOpacity={backgroundOpacity}>
                <MediaBlock data={media} aspectRatio="1x1" />
            </ImageMobile>
            <ImageTablet $backgroundOpacity={backgroundOpacity}>
                <MediaBlock data={media} aspectRatio="4x3" />
            </ImageTablet>
            <ImageDesktop $backgroundOpacity={backgroundOpacity}>
                <MediaBlock data={media} aspectRatio="16x9" />
            </ImageDesktop>
            <ImageLargeDesktop $backgroundOpacity={backgroundOpacity}>
                <MediaBlock data={media} aspectRatio="3x1" />
            </ImageLargeDesktop>
            <AbsoluteGridRoot grid>
                <Content $alignItems={alignmentMap[heading.textAlignment]}>
                    <HeadingBlock data={heading} colorInverted />
                    <RichTextBlock data={text} colorInverted />
                    <CallToActionListBlock data={callToActionList} />
                </Content>
            </AbsoluteGridRoot>
        </Root>
    ),
    { label: "Billboard Teaser" },
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

const BaseImage = styled.div<{ $backgroundOpacity: string }>`
    filter: brightness(calc(100% - ${({ $backgroundOpacity }) => $backgroundOpacity}%));
`;

const ImageMobile = styled(BaseImage)`
    ${({ theme }) => theme.breakpoints.xs.mediaQuery} {
        display: none;
    }
`;

const ImageTablet = styled(BaseImage)`
    display: none;

    ${({ theme }) => theme.breakpoints.xs.mediaQuery} {
        display: block;
    }

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        display: none;
    }
`;

const ImageDesktop = styled(BaseImage)`
    display: none;

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        display: block;
    }

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        display: none;
    }
`;

const ImageLargeDesktop = styled(BaseImage)`
    display: none;

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        display: block;
    }
`;
