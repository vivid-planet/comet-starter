import { hasRichTextBlockContent, PropsWithData, SvgImageBlock, withPreview } from "@comet/cms-site";
import { KeyFactsItemBlockData } from "@src/blocks.generated";
import { defaultRichTextInlineStyleMap, RichTextBlock } from "@src/common/blocks/RichTextBlock";
import { Typography } from "@src/common/components/Typography";
import { colors, spacing } from "@src/constants.yak";
import { styled } from "next-yak";
import { Renderers } from "redraft";

const descriptionRenderers: Renderers = {
    inline: defaultRichTextInlineStyleMap,
};

export const KeyFactItemBlock = withPreview(
    ({ data: { icon, fact, label, description } }: PropsWithData<KeyFactsItemBlockData>) => (
        <Root>
            {icon.damFile && <Icon data={icon} width={48} height={48} />}
            <FactTypography variant="h500">{fact}</FactTypography>
            <Typography variant="h350">{label}</Typography>
            {hasRichTextBlockContent(description) && (
                <DescriptionTypography variant="p200">
                    <RichTextBlock data={description} renderers={descriptionRenderers} />
                </DescriptionTypography>
            )}
        </Root>
    ),
    { label: "Key fact" },
);

const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`;

const Icon = styled(SvgImageBlock)`
    margin-bottom: ${spacing.S100};
`;

const FactTypography = styled(Typography)`
    margin-bottom: ${spacing.S300};
    color: ${colors.primary.dark};
`;

const DescriptionTypography = styled(Typography)`
    margin-top: ${spacing.S100};
`;
