import { PropsWithData, withPreview } from "@comet/cms-site";
import { MediaGalleryBlockData } from "@src/blocks.generated";
import { PageLayout } from "@src/layout/PageLayout";
import styled from "styled-components";

type MediaGalleryBlockProps = PropsWithData<MediaGalleryBlockData>;

export const MediaGalleryBlock = withPreview(
    ({ data }: MediaGalleryBlockProps) => <Root>{/*<ListBlock data={data} block={(block) => <AccordionItemBlock data={block} />} />*/}</Root>,
    { label: "MediaGallery" },
);

export const PageContentMediaGalleryBlock = (props: MediaGalleryBlockProps) => (
    <PageLayout grid>
        <PageLayoutContent>
            <MediaGalleryBlock {...props} />
        </PageLayoutContent>
    </PageLayout>
);

const Root = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid ${({ theme }) => theme.palette.grey["300"]};
`;

const PageLayoutContent = styled.div`
    grid-column: 3 / -3;
`;
