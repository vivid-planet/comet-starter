export interface AccordionBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        props: AccordionItemBlockData;
    }>;
}
export interface AccordionContentBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        type: string;
        props: RichTextBlockData | StandaloneHeadingBlockData | SpaceBlockData | StandaloneCallToActionListBlockData;
    }>;
}
export interface AccordionItemBlockData {
    title?: string;
    content: AccordionContentBlockData;
    openByDefault: boolean;
}
export interface AnchorBlockData {
    name?: string;
}
export interface BasicStageBlockData {
    media: MediaBlockData;
    heading: HeadingBlockData;
    text: RichTextBlockData;
    overlay: number;
    alignment: "left" | "center";
    callToActionList: CallToActionListBlockData;
}
export interface BillboardTeaserBlockData {
    media: MediaBlockData;
    heading: HeadingBlockData;
    text: RichTextBlockData;
    overlay: number;
    callToActionList: CallToActionListBlockData;
}
export interface CallToActionBlockData {
    textLink: TextLinkBlockData;
    variant: "Contained" | "Outlined" | "Text";
}
export interface CallToActionListBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        props: CallToActionBlockData;
    }>;
}
export interface ColumnsBlockData {
    layout: string;
    columns: Array<{
        key: string;
        visible: boolean;
        props: ColumnsContentBlockData;
    }>;
}
export interface ColumnsContentBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        type: string;
        props:
            | AccordionBlockData
            | AnchorBlockData
            | RichTextBlockData
            | SpaceBlockData
            | StandaloneHeadingBlockData
            | StandaloneCallToActionListBlockData
            | StandaloneMediaBlockData
            | MediaGalleryBlockData;
    }>;
}
export interface ContentGroupBlockData {
    content: ContentGroupContentBlockData;
    backgroundColor: "default" | "lightGray" | "darkGray";
}
export interface ContentGroupContentBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        type: string;
        props:
            | AccordionBlockData
            | AnchorBlockData
            | SpaceBlockData
            | TeaserBlockData
            | RichTextBlockData
            | StandaloneHeadingBlockData
            | ColumnsBlockData
            | StandaloneCallToActionListBlockData
            | KeyFactsBlockData
            | StandaloneMediaBlockData
            | MediaGalleryBlockData;
    }>;
}
export interface DamFileDownloadLinkBlockData {
    file?: {
        id: string;
        name: string;
        fileUrl: string;
        size: number;
        scope?: unknown;
    };
    openFileType: "NewTab" | "Download";
}
export interface DamImageBlockData {
    attachedBlocks: Array<{
        type: string;
        props: PixelImageBlockData | SvgImageBlockData;
    }>;
    activeType?: string;
    block?: {
        type: string;
        props: PixelImageBlockData | SvgImageBlockData;
    };
}
export interface DamVideoBlockData {
    autoplay?: boolean;
    showControls?: boolean;
    loop?: boolean;
    previewImage: PixelImageBlockData;
    damFile?: {
        id: string;
        name: string;
        size: number;
        mimetype: string;
        contentHash: string;
        title?: string;
        altText?: string;
        archived: boolean;
        scope?: unknown;
        fileUrl: string;
    };
}
export interface EmailLinkBlockData {
    email?: string;
}
export interface ExternalLinkBlockData {
    targetUrl?: string;
    openInNewWindow: boolean;
}
export interface FooterContentBlockData {
    text: RichTextBlockData;
    image: DamImageBlockData;
    linkList: LinkListBlockData;
    copyrightNotice: string;
}
export interface HeadingBlockData {
    eyebrow: RichTextBlockData;
    headline: RichTextBlockData;
    htmlTag: "H1" | "H2" | "H3" | "H4" | "H5" | "H6";
}
export interface InternalLinkBlockData {
    targetPageAnchor?: string;
    targetPage?: {
        id: string;
        name: string;
        path: string;
        scope?: unknown;
        documentType: string;
    };
}
export interface KeyFactsBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        props: KeyFactsItemBlockData;
    }>;
}
export interface KeyFactsItemBlockData {
    icon: SvgImageBlockData;
    fact: string;
    label: string;
    description: RichTextBlockData;
}
export interface LinkBlockData {
    title?: string;
    attachedBlocks: Array<{
        type: string;
        props: InternalLinkBlockData | ExternalLinkBlockData | DamFileDownloadLinkBlockData | EmailLinkBlockData | PhoneLinkBlockData;
    }>;
    activeType?: string;
    block?: {
        type: string;
        props: InternalLinkBlockData | ExternalLinkBlockData | DamFileDownloadLinkBlockData | EmailLinkBlockData | PhoneLinkBlockData;
    };
}
export interface LinkListBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        props: TextLinkBlockData;
    }>;
}
export interface MediaBlockData {
    attachedBlocks: Array<{
        type: string;
        props: DamImageBlockData | DamVideoBlockData | YouTubeVideoBlockData;
    }>;
    activeType?: string;
    block?: {
        type: string;
        props: DamImageBlockData | DamVideoBlockData | YouTubeVideoBlockData;
    };
}
export interface MediaGalleryBlockData {
    items: MediaGalleryListBlockData;
    aspectRatio: "16x9" | "4x3" | "3x2" | "3x1" | "2x1" | "1x1" | "1x2" | "1x3" | "2x3" | "3x4" | "9x16";
}
export interface MediaGalleryItemBlockData {
    media: MediaBlockData;
    caption?: string;
}
export interface MediaGalleryListBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        props: MediaGalleryItemBlockData;
    }>;
}
export interface NewsContentBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        type: string;
        props: HeadingBlockData | RichTextBlockData | DamImageBlockData;
    }>;
}
export interface OptionalPixelImageBlockData {
    block?: PixelImageBlockData;
    visible: boolean;
}
export interface PageContentBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        type: string;
        props:
            | AccordionBlockData
            | AnchorBlockData
            | BillboardTeaserBlockData
            | SpaceBlockData
            | TeaserBlockData
            | RichTextBlockData
            | StandaloneHeadingBlockData
            | ColumnsBlockData
            | StandaloneCallToActionListBlockData
            | KeyFactsBlockData
            | StandaloneMediaBlockData
            | ContentGroupBlockData
            | MediaGalleryBlockData;
    }>;
}
export interface PhoneLinkBlockData {
    phone?: string;
}
export interface PixelImageBlockData {
    damFile?: {
        id: string;
        name: string;
        size: number;
        mimetype: string;
        contentHash: string;
        title?: string;
        altText?: string;
        archived: boolean;
        scope?: unknown;
        image?: {
            width: number;
            height: number;
            cropArea: {
                focalPoint: "SMART" | "CENTER" | "NORTHWEST" | "NORTHEAST" | "SOUTHWEST" | "SOUTHEAST";
                width?: number;
                height?: number;
                x?: number;
                y?: number;
            };
            dominantColor?: string;
        };
        fileUrl: string;
    };
    cropArea?: {
        focalPoint: "SMART" | "CENTER" | "NORTHWEST" | "NORTHEAST" | "SOUTHWEST" | "SOUTHEAST";
        width?: number;
        height?: number;
        x?: number;
        y?: number;
    };
    urlTemplate: string;
}
export interface RedirectsLinkBlockData {
    attachedBlocks: Array<{
        type: string;
        props: InternalLinkBlockData | ExternalLinkBlockData;
    }>;
    activeType?: string;
    block?: {
        type: string;
        props: InternalLinkBlockData | ExternalLinkBlockData;
    };
}
export interface RichTextBlockData {
    draftContent: unknown;
}
export interface SeoBlockData {
    htmlTitle?: string;
    metaDescription?: string;
    openGraphTitle?: string;
    openGraphDescription?: string;
    openGraphImage: OptionalPixelImageBlockData;
    structuredData?: string;
    noIndex: boolean;
    priority: "0_0" | "0_1" | "0_2" | "0_3" | "0_4" | "0_5" | "0_6" | "0_7" | "0_8" | "0_9" | "1_0";
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    canonicalUrl?: string;
    alternativeLinks: Array<{
        code?: string;
        url?: string;
    }>;
}
export interface SpaceBlockData {
    height: number;
}
export interface SpaceBlockData {
    spacing: "D100" | "D200" | "D300" | "D400" | "S100" | "S200" | "S300" | "S400" | "S500" | "S600";
}
export interface StageBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        props: BasicStageBlockData;
    }>;
}
export interface StandaloneCallToActionListBlockData {
    callToActionList: CallToActionListBlockData;
    alignment: "left" | "center" | "right";
}
export interface StandaloneHeadingBlockData {
    heading: HeadingBlockData;
    textAlignment: "left" | "center";
}
export interface StandaloneMediaBlockData {
    media: MediaBlockData;
    aspectRatio: "16x9" | "4x3" | "3x2" | "3x1" | "2x1" | "1x1" | "1x2" | "1x3" | "2x3" | "3x4" | "9x16";
}
export interface SvgImageBlockData {
    damFile?: {
        id: string;
        name: string;
        size: number;
        mimetype: string;
        contentHash: string;
        title?: string;
        altText?: string;
        archived: boolean;
        scope?: unknown;
        fileUrl: string;
    };
}
export interface TeaserBlockData {
    blocks: Array<{
        key: string;
        visible: boolean;
        props: TeaserItemBlockData;
    }>;
}
export interface TeaserItemBlockData {
    media: MediaBlockData;
    title: string;
    description: RichTextBlockData;
    link: TextLinkBlockData;
}
export interface TextLinkBlockData {
    text: string;
    link: LinkBlockData;
}
export interface VimeoVideoBlockData {
    autoplay?: boolean;
    showControls?: boolean;
    loop?: boolean;
    previewImage: PixelImageBlockData;
    vimeoIdentifier?: string;
}
export interface YouTubeVideoBlockData {
    autoplay?: boolean;
    showControls?: boolean;
    loop?: boolean;
    previewImage: PixelImageBlockData;
    youtubeIdentifier?: string;
}
