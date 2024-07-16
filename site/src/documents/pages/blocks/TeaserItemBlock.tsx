import { PropsWithData, withPreview } from "@comet/cms-site";
import { TeaserItemBlockData } from "@src/blocks.generated";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { MediaBlock } from "@src/common/blocks/MediaBlock";
import { defaultRichTextRenderers, RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { Typography } from "@src/common/components/Typography";
import { SvgUse } from "@src/common/helpers/SvgUse";
import { Renderers } from "redraft";
import styled from "styled-components";

const descriptionRenderers: Renderers = {
    inline: defaultRichTextRenderers.inline,
};

export const TeaserItemBlock = withPreview(
    ({ data: { media, title, description, callToAction } }: PropsWithData<TeaserItemBlockData>) => (
        <LinkBlock data={callToAction.link}>
            <ItemContent>
                <MediaPhone>
                    <MediaBlock data={media} aspectRatio="1x1" sizes="20vw" />
                </MediaPhone>
                <MediaTablet>
                    <MediaBlock data={media} aspectRatio="16x9" sizes="20vw" />
                </MediaTablet>
                <ContentContainer>
                    <TitleTypography variant="h350">{title}</TitleTypography>
                    <Typography variant="p200">
                        <RichTextBlock data={description} renderers={descriptionRenderers} />
                    </Typography>
                    <TextLinkContainer>
                        <ArrowIcon href="/icons/arrow-right.svg#arrow-right" />
                        <LinkText>{callToAction.text}</LinkText>
                    </TextLinkContainer>
                </ContentContainer>
            </ItemContent>
        </LinkBlock>
    ),
    { label: "Teaser Item" },
);

const ItemContent = styled.a`
    text-decoration: none;
    cursor: pointer;
    display: flex;
    flex: 1;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.S300};

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        flex: unset;
        gap: ${({ theme }) => theme.spacing.S400};
        flex-direction: column;
    }
`;

const MediaPhone = styled.div`
    flex: 1;

    ${({ theme }) => theme.breakpoints.xs.mediaQuery} {
        display: none;
    }
`;

const MediaTablet = styled.div`
    flex: 1;
    display: none;

    ${({ theme }) => theme.breakpoints.xs.mediaQuery} {
        display: block;
    }
`;

const ContentContainer = styled.div`
    flex: 2;
`;

const TitleTypography = styled(Typography)`
    margin-bottom: ${({ theme }) => theme.spacing.S100};
    color: ${({ theme }) => theme.palette.text.primary};
`;

const TextLinkContainer = styled.div`
    margin-top: ${({ theme }) => theme.spacing.S300};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.S200};
    color: ${({ theme }) => theme.palette.primary.main};
    transition: color 0.3s ease-in-out;

    &:hover {
        color: ${({ theme }) => theme.palette.primary.dark};
    }
`;

const ArrowIcon = styled(SvgUse)`
    width: 16px;
    height: 16px;
`;

const LinkText = styled.span`
    font-family: ${({ theme }) => theme.fontFamily};
    font-size: 16px;
    font-weight: 700;
`;
