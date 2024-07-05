import { hasRichTextBlockContent, PropsWithData, withPreview } from "@comet/cms-site";
import { BillboardTeaserBlockData, HeadingBlockData } from "@src/blocks.generated";
import { CallToActionListBlock } from "@src/common/blocks/CallToActionListBlock";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { PageLayout } from "@src/layout/PageLayout";
import { CSSProperties } from "react";
import styled from "styled-components";

const alignmentMap: Record<HeadingBlockData["textAlignment"], CSSProperties["alignItems"]> = {
    Left: "left",
    Center: "center",
};

export const BillboardTeaserBlock = withPreview(
    ({ data: { media, heading, text, callToActionList } }: PropsWithData<BillboardTeaserBlockData>) => (
        <Root>
            {/*TODO: use media block and check if absolute container is above preview image*/}
            <ImageMobile>
                <DamImageBlock data={media} aspectRatio="1x1" />
            </ImageMobile>
            <ImageTablet>
                <DamImageBlock data={media} aspectRatio="4x3" />
            </ImageTablet>
            <ImageDesktop>
                <DamImageBlock data={media} aspectRatio="16x9" />
            </ImageDesktop>
            <ImageLargeDesktop>
                <DamImageBlock data={media} aspectRatio="21x9" />
            </ImageLargeDesktop>
            <AbsoluteContainer>
                <GridRoot grid>
                    <Content $alignItems={alignmentMap[heading.textAlignment]}>
                        {(hasRichTextBlockContent(heading.eyebrow) || hasRichTextBlockContent(heading.headline)) && <HeadingBlock data={heading} />}
                        {hasRichTextBlockContent(text) && <RichTextBlock data={text} />}
                        {callToActionList.blocks.length > 0 && <CallToActionListBlock data={callToActionList} />}
                    </Content>
                </GridRoot>
            </AbsoluteContainer>
        </Root>
    ),
    { label: "Billboard Teaser" },
);

const Root = styled.div`
    position: relative;
    overflow: hidden;
`;

const GridRoot = styled(PageLayout)`
    height: 100%;
`;

const AbsoluteContainer = styled.div`
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

const BaseImage = styled.div`
    img {
        object-fit: cover;
    }
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
