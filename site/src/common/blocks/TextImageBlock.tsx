import { PropsWithData, withPreview } from "@comet/cms-site";
import { TextImageBlockData } from "@src/blocks.generated";
import { BlockRoot } from "@src/components/common/BlockRoot";
import styled from "styled-components";

import { DamImageBlock } from "./DamImageBlock";
import { RichTextBlock } from "./RichTextBlock";

export const TextImageBlock = withPreview(
    ({ data: { text, image, imageAspectRatio, imagePosition } }: PropsWithData<TextImageBlockData>) => {
        return (
            <Root>
                {imagePosition === "left" && <DamImageBlock data={image} aspectRatio={imageAspectRatio} layout="responsive" sizes="50vw" />}
                <RichTextBlock data={text} disableBlockRoot />
                {imagePosition === "right" && <DamImageBlock data={image} aspectRatio={imageAspectRatio} layout="responsive" sizes="50vw" />}
            </Root>
        );
    },
    { label: "Text/Image" },
);

const Root = styled(BlockRoot)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: ${({ theme }) => theme.spacing.D100};
`;
