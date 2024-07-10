import { hasRichTextBlockContent, PropsWithData, withPreview } from "@comet/cms-site";
import { TeaserItemBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
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
        <Root>
            <LinkBlock data={callToAction.textLink.link}>
                <ItemContent>
                    <ContentContainer>
                        {/*TODO: use media block when available*/}
                        <DamImageBlock data={media} aspectRatio={"16x9"} />
                    </ContentContainer>
                    <ContentContainer>
                        <TitleTypography variant={"h350"}>{title}</TitleTypography>
                        {hasRichTextBlockContent(description) && (
                            <Typography variant={"p200"}>
                                <RichTextBlock data={description} renderers={descriptionRenderers} />
                            </Typography>
                        )}
                        <TextLinkContainer>
                            <ArrowIcon href={"/icons/arrow-right.svg#arrow-right"} />
                            <LinkText>{callToAction.textLink.text}</LinkText>
                        </TextLinkContainer>
                    </ContentContainer>
                </ItemContent>
            </LinkBlock>
        </Root>
    ),
    { label: "Teaser Item" },
);

const Root = styled.div`
    display: flex;
    flex: 1 0 80%;
    justify-content: center;

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        flex: 1 0 21%;
    }
`;

const ItemContent = styled.a`
    text-decoration: none;
    display: flex;
    flex: 1;
    flex-direction: row;
    gap: ${({ theme }) => theme.spacing.S300};

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        flex: unset;
        gap: ${({ theme }) => theme.spacing.S400};
        flex-direction: column;
        max-width: 350px;
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
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
