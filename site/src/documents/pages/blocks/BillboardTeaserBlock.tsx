import { PropsWithData, withPreview } from "@comet/cms-site";
import { BillboardTeaserBlockData } from "@src/blocks.generated";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { breakpoints, colors, spacing } from "@src/constants.yak";
import { PageLayout } from "@src/layout/PageLayout";
import { styled } from "next-yak";

export const BillboardTeaserBlock = withPreview(
    ({ data: { media, heading, text, overlay, callToActionList } }: PropsWithData<BillboardTeaserBlockData>) => (
        <Root>
            <ImageMobile>
                <MediaBlock data={media} aspectRatio="1x1" />
            </ImageMobile>
            <ImageTablet>
                <MediaBlock data={media} aspectRatio="4x3" />
            </ImageTablet>
            <ImageDesktop>
                <MediaBlock data={media} aspectRatio="16x9" />
            </ImageDesktop>
            <ImageLargeDesktop>
                <MediaBlock data={media} aspectRatio="3x1" />
            </ImageLargeDesktop>
            <ImageOverlay $overlay={overlay} />
            <AbsoluteGridRoot grid>
                <Content>
                    <HeadingBlock data={heading} />
                    <RichTextBlock data={text} />
                    <CallToActionListBlock data={callToActionList} />
                </Content>
            </AbsoluteGridRoot>
        </Root>
    ),
    { label: "Billboard Teaser" },
);

const Root = styled(PageLayout)`
    position: relative;
`;

const ImageOverlay = styled.div<{ $overlay: number }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: ${({ $overlay }) => $overlay}%;
`;

const AbsoluteGridRoot = styled(PageLayout)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const Content = styled.div`
    padding: ${spacing.D200} 0;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: ${colors.text.inverted};
    grid-column: 3 / -3;

    ${breakpoints.xs} {
        grid-column: 5 / -5;
    }

    ${breakpoints.lg} {
        grid-column: 7 / -7;
    }
`;

const ImageMobile = styled.div`
    ${breakpoints.xs} {
        display: none;
    }
`;

const ImageTablet = styled.div`
    display: none;

    ${breakpoints.xs} {
        display: block;
    }

    ${breakpoints.sm} {
        display: none;
    }
`;

const ImageDesktop = styled.div`
    display: none;

    ${breakpoints.sm} {
        display: block;
    }

    ${breakpoints.md} {
        display: none;
    }
`;

const ImageLargeDesktop = styled.div`
    display: none;

    ${breakpoints.md} {
        display: block;
    }
`;
