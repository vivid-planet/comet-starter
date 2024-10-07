import { PropsWithData, withPreview } from "@comet/cms-site";
import { FooterContentBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { Typography } from "@src/common/components/Typography";
import styled from "styled-components";

export const FooterContentBlock = withPreview(
    ({ data: { text, image, linkList, copyrightNotice } }: PropsWithData<FooterContentBlockData>) => {
        return (
            <Root>
                <ImageWrapper>
                    <DamImageBlock data={image} aspectRatio="1/1" style={{ objectFit: "contain" }} />
                </ImageWrapper>
                <RichTextWrapper>
                    <RichTextBlock data={text} disableLastBottomSpacing />
                </RichTextWrapper>
                <HorizontalLine />
                <LinkCopyrightWrapper>
                    {linkList.blocks.length > 0 && (
                        <LinksWrapper>
                            {linkList.blocks.map((block) => (
                                <LinkBlock key={block.key} data={block.props.link}>
                                    <LinkText component="span" variant="p200">
                                        {block.props.text}
                                    </LinkText>
                                </LinkBlock>
                            ))}
                        </LinksWrapper>
                    )}
                    {copyrightNotice && <CopyrightNotice variant="p200">{copyrightNotice}</CopyrightNotice>}
                </LinkCopyrightWrapper>
            </Root>
        );
    },
    { label: "Footer" },
);

const Root = styled.footer`
    margin-top: auto;
    background-color: ${({ theme }) => theme.palette.gray["900"]};
    color: ${({ theme }) => theme.palette.gray["50"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => `60px ${theme.spacing.D100}`};
    gap: ${({ theme }) => theme.spacing.D100};

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        flex-direction: row;
        justify-content: space-between;
    }

    ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
        position: relative;
    }
`;

const RichTextWrapper = styled.div`
    text-align: center;

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        max-width: 40%;
    }

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        max-width: 40%;
        text-align: left;
    }
`;

const ImageWrapper = styled.div`
    max-width: 100px;
    width: 100%;

    ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const LinkCopyrightWrapper = styled.div`
    color: ${({ theme }) => theme.palette.gray["400"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.S500};

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        max-width: 40%;
    }

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        align-items: flex-end;
    }
`;

const LinksWrapper = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.S500};
    flex-wrap: wrap;
    justify-content: center;
`;

const CopyrightNotice = styled(Typography)`
    text-align: center;
`;

const LinkText = styled(Typography)`
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: underline;
`;

const HorizontalLine = styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    background-color: ${({ theme }) => theme.palette.gray["600"]};
    color: ${({ theme }) => theme.palette.gray["600"]};
    margin: 35px 0;

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        display: none;
    }
`;
