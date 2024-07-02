import { hasRichTextBlockContent, PropsWithData, SvgImageBlock, withPreview } from "@comet/cms-site";
import { KeyFactsBlockData, KeyFactsItemBlockData } from "@src/blocks.generated";
import { HeadingBlock } from "@src/common/blocks/HeadingBlock";
import { defaultRichTextRenderers, RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { Typography } from "@src/common/components/Typography";
import { PageLayout } from "@src/layout/PageLayout";
import { Renderers } from "redraft";
import styled from "styled-components";

const descriptionRenderers: Renderers = {
    inline: defaultRichTextRenderers.inline,
};

const KeyFactItemBlock = withPreview(
    ({ data: { icon, fact, label, description } }: PropsWithData<KeyFactsItemBlockData>) => (
        <ItemRoot>
            <ItemContent>
                {icon.damFile && <SvgImageBlock data={icon} width={48} height={48} />}
                <FactTypography variant={"h500"}>{fact}</FactTypography>
                <LabelTypography variant={"h350"}>{label}</LabelTypography>
                {hasRichTextBlockContent(description) && (
                    <DescriptionTypography variant={"p200"}>
                        <RichTextBlock data={description} renderers={descriptionRenderers} />
                    </DescriptionTypography>
                )}
            </ItemContent>
        </ItemRoot>
    ),
    { label: "Key fact" },
);

export const KeyFactsBlock = withPreview(
    ({ data: { heading, items } }: PropsWithData<KeyFactsBlockData>) => (
        <PageLayout grid>
            <PageLayoutContent>
                {(hasRichTextBlockContent(heading.eyebrow) || hasRichTextBlockContent(heading.headline)) && <HeadingBlock data={heading} />}
                <ItemWrapper>{items.blocks.map((item) => item.visible && <KeyFactItemBlock data={item.props} key={item.key} />)}</ItemWrapper>
            </PageLayoutContent>
        </PageLayout>
    ),
    { label: "Key facts" },
);

const PageLayoutContent = styled.div`
    grid-column: 3 / -3;
    margin: ${({ theme }) => theme.spacing.D300} 0;
`;

const ItemWrapper = styled.div`
    margin-top: ${({ theme }) => theme.spacing.D200};
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.D100};
`;

const ItemRoot = styled.div`
    display: flex;
    flex: 1 0 40%;
    justify-content: center;

    ${({ theme }) => theme.breakpoints.sm.mediaQuery} {
        flex: 1 0 21%;
    }
`;

const ItemContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 350px;
`;

const FactTypography = styled(Typography)`
    margin-top: ${({ theme }) => theme.spacing.S100};
    margin-bottom: ${({ theme }) => theme.spacing.S300};
    color: ${({ theme }) => theme.palette.primary.dark};
    text-align: center;
`;

const LabelTypography = styled(Typography)`
    text-align: center;
`;

const DescriptionTypography = styled(Typography)`
    margin-top: ${({ theme }) => theme.spacing.S100};
    text-align: center;
`;
