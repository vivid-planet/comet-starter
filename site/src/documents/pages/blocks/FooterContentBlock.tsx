import { PropsWithData, withPreview } from "@comet/cms-site";
import { FooterContentBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { Typography } from "@src/common/components/Typography";
import * as React from "react";
import styled from "styled-components";

export const FooterContentBlock = withPreview(
    ({ data: { text, image, linkList, copyrightNotice } }: PropsWithData<FooterContentBlockData>) => {
        return (
            <Root>
                <ImageTextWrapper>
                    <ImageWrapper>
                        <DamImageBlock data={image} aspectRatio="1/1" style={{ objectFit: "contain" }} />
                    </ImageWrapper>
                    <RichTextWrapper>
                        <RichTextBlock data={text} />
                    </RichTextWrapper>
                </ImageTextWrapper>
                <HorizontalLine />
                <LinkCopyrightWrapper>
                    {!!linkList.blocks.length && (
                        <LinksBlock>
                            {linkList.blocks.map((block) => (
                                <LinkText as={LinkBlock} key={block.key} data={block.props.link} variant="p200">
                                    {block.props.text}
                                </LinkText>
                            ))}
                        </LinksBlock>
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
    background-color: ${({ theme }) => theme.palette.grey["900"]};
    color: ${({ theme }) => theme.palette.grey["50"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${({ theme }) => `60px ${theme.spacing.D100}`};

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        flex-direction: row;
        justify-content: space-between;
    }

    ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
        position: relative;
    }
`;

const ImageTextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.D100};
    flex-shrink: 0;
    flex-grow: 1;

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        flex-direction: row;
    }
`;

const RichTextWrapper = styled.div`
    text-align: center;

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
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
        place-self: start center;
    }
`;

const LinkCopyrightWrapper = styled.div`
    color: ${({ theme }) => theme.palette.grey["400"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.S500};

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        align-items: flex-end;
    }
`;

const LinksBlock = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.S500};
`;

const CopyrightNotice = styled(Typography)`
    text-align: center;
`;

const LinkText = styled(Typography)`
    color: ${({ theme }) => theme.palette.grey["400"]};
    text-decoration: underline;
    font-family: ${({ theme }) => theme.fontFamily};
`;

const HorizontalLine = styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    background-color: ${({ theme }) => theme.palette.grey["600"]};
    color: ${({ theme }) => theme.palette.grey["600"]};
    margin: 19px 0 35px; /* 19px since element in RTE has margin bottom of 16px */

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        display: none;
    }
`;
