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
                        <DamImageBlock data={image} objectFit={"contain"} />
                    </ImageWrapper>
                    <RichTextWrapper>
                        <RichTextBlock data={text} />
                    </RichTextWrapper>
                </ImageTextWrapper>
                <HorizontalLine />
                <LinkCopyrightWrapper>
                    <LinksBlock>
                        {linkList.blocks.map((block) => (
                            <LinkBlock key={block.key} data={block.props.link}>
                                <Typography component={"a"} variant={"p200"}>
                                    {block.props.text}
                                </Typography>
                            </LinkBlock>
                        ))}
                    </LinksBlock>
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
    padding: 60px 16px;

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        padding: 60px 30px;
    }

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        padding: 60px 45px;
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
    gap: 30px;

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        gap: 25px;
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
    justify-self: center;
    align-self: start;
    max-width: 250px;

    ${({ theme }) => theme.breakpoints.lg.mediaQuery} {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const LinkCopyrightWrapper = styled.div`
    color: ${({ theme }) => theme.palette.grey["400"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        align-items: flex-end;
    }
`;

const LinksBlock = styled.div`
    display: flex;
    gap: 20px;
`;

const CopyrightNotice = styled(Typography)`
    text-align: center;
`;

const HorizontalLine = styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    background-color: ${({ theme }) => theme.palette.grey["600"]};
    color: ${({ theme }) => theme.palette.grey["600"]};
    margin: 19px 0 35px 0; // 19px since element in RTE has margin bottom of 16px

    ${({ theme }) => theme.breakpoints.md.mediaQuery} {
        display: none;
    }
`;
