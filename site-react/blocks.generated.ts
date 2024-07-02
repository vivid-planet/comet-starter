export interface AnchorBlockData {
    name?: string;
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
        props: AnchorBlockData | RichTextBlockData | SpaceBlockData | HeadingBlockData | CallToActionListBlockData;
    }>;
}
export interface DamFileDownloadLinkBlockData {
    file?: {
        id: string;
        name: string;
        fileUrl: string;
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
    loop?: boolean;
    showControls?: boolean;
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
export interface HeadingBlockData {
    eyebrow: RichTextBlockData;
    headline: RichTextBlockData;
    htmlTag: "H1" | "H2" | "H3" | "H4" | "H5" | "H6";
    textAlignment: "Left" | "Center";
}
export interface InternalLinkBlockData {
    targetPageAnchor?: string;
    targetPage?: {
        id: string;
        name: string;
        path: string;
        documentType: string;
    };
}
export interface LinkBlockData {
    title?: string;
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
            | AnchorBlockData
            | SpaceBlockData
            | RichTextBlockData
            | HeadingBlockData
            | DamImageBlockData
            | TextImageBlockData
            | DamVideoBlockData
            | YouTubeVideoBlockData
            | ColumnsBlockData
            | CallToActionListBlockData;
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
export interface TextImageBlockData {
    text: RichTextBlockData;
    image: DamImageBlockData;
    imagePosition: "left" | "right";
    imageAspectRatio: string;
}
export interface TextLinkBlockData {
    text: string;
    link: LinkBlockData;
}
export interface YouTubeVideoBlockData {
    youtubeIdentifier?: string;
    aspectRatio: "16X9" | "4X3";
    autoplay?: boolean;
    showControls?: boolean;
    loop?: boolean;
}
