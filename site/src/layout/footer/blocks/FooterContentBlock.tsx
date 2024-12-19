import { PropsWithData, withPreview } from "@comet/cms-site";
import { FooterContentBlockData } from "@src/blocks.generated";
import { DamImageBlock } from "@src/common/blocks/DamImageBlock";
import { LinkBlock } from "@src/common/blocks/LinkBlock";
import { RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { Typography } from "@src/common/components/Typography";
import { breakpoints, colors, spacing } from "@src/constants.yak";
import { PageLayout } from "@src/layout/PageLayout";
import { styled } from "next-yak";

export const FooterContentBlock = withPreview(
    ({ data: { text, image, linkList, copyrightNotice } }: PropsWithData<FooterContentBlockData>) => {
        return (
            <Root>
                <PageLayout grid>
                    <PageLayoutContent>
                        <TopContainer>
                            <ImageWrapper>
                                <DamImageBlock data={image} aspectRatio="1/1" style={{ objectFit: "contain" }} />
                            </ImageWrapper>
                            <RichTextWrapper>
                                <RichTextBlock data={text} disableLastBottomSpacing />
                            </RichTextWrapper>
                        </TopContainer>
                        <HorizontalLine />
                        <LinkCopyrightWrapper>
                            {linkList.blocks.length > 0 && (
                                <LinksWrapper>
                                    {linkList.blocks.map((block) => (
                                        <>
                                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                            {/* @ts-ignore */}
                                            <LinkText key={block.key} as={LinkBlock} data={block.props.link} variant="p200">
                                                {block.props.text}
                                            </LinkText>
                                        </>
                                    ))}
                                </LinksWrapper>
                            )}
                            {copyrightNotice && <CopyrightNotice variant="p200">{copyrightNotice}</CopyrightNotice>}
                        </LinkCopyrightWrapper>
                    </PageLayoutContent>
                </PageLayout>
            </Root>
        );
    },
    { label: "Footer" },
);

const Root = styled.footer`
    margin-top: auto;
    background-color: ${colors.gray["900"]};
    color: ${colors.gray["50"]};
`;

const PageLayoutContent = styled.div`
    grid-column: 2 / -2;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${spacing.D400} 0;

    ${breakpoints.md} {
        position: relative;
        gap: ${spacing.D100};
        flex-direction: row;
        justify-content: space-between;
    }
`;

const TopContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    gap: ${spacing.D100};

    ${breakpoints.xs} {
        align-self: stretch;
        flex-direction: row-reverse;
        justify-content: space-between;
    }

    ${breakpoints.md} {
        flex-direction: row;
    }
`;

const RichTextWrapper = styled.div`
    width: 100%;
    text-align: center;

    ${breakpoints.xs} {
        text-align: left;
    }

    ${breakpoints.md} {
        max-width: 80%;
    }
`;

const ImageWrapper = styled.div`
    width: 100px;

    ${breakpoints.md} {
        position: absolute;
        width: 100%;
        max-width: 100px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

const LinkCopyrightWrapper = styled.div`
    color: ${colors.gray["400"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${spacing.S500};

    ${breakpoints.md} {
        width: 80%;
        align-items: flex-end;
    }
`;

const LinksWrapper = styled.div`
    display: flex;
    gap: ${spacing.S500};
    flex-wrap: wrap;
    justify-content: center;
`;

const CopyrightNotice = styled(Typography)`
    text-align: center;

    ${breakpoints.md} {
        text-align: right;
    }
`;

const LinkText = styled(Typography)`
    color: ${colors.primary.main};
    text-decoration: underline;
`;

const HorizontalLine = styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    background-color: ${colors.gray["600"]};
    color: ${colors.gray["600"]};
    margin: ${spacing.D300} 0;

    ${breakpoints.md} {
        display: none;
    }
`;
