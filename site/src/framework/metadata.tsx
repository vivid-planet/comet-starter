/**
 * Replacement for the Next.js Metadata API (the subset used by this site).
 *
 * <MetadataTags> renders plain <title>, <meta> and <link> elements. React 19 hoists them into <head>, during SSR as well as on
 * client side navigation.
 */

export type Metadata = {
    metadataBase?: URL;
    title?: string;
    description?: string;
    openGraph?: {
        title?: string;
        description?: string;
        type?: string;
        url?: string;
        images?: string;
    };
    robots?: {
        index?: boolean;
    };
    alternates?: {
        canonical?: string;
        languages?: Record<string, string>;
    };
};

function toAbsoluteUrl(url: string, metadataBase: URL | undefined) {
    const isAbsolute = /^[a-z][a-z\d+.-]*:/i.test(url);
    return metadataBase && !isAbsolute ? new URL(url, metadataBase).toString() : url;
}

export function MetadataTags({ metadata }: { metadata: Metadata }) {
    const { metadataBase, title, description, openGraph, robots, alternates } = metadata;
    const openGraphImage = openGraph?.images ? toAbsoluteUrl(openGraph.images, metadataBase) : undefined;

    return (
        <>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {robots?.index !== undefined && <meta name="robots" content={robots.index ? "index" : "noindex"} />}
            {alternates?.canonical && <link rel="canonical" href={toAbsoluteUrl(alternates.canonical, metadataBase)} />}
            {Object.entries(alternates?.languages ?? {}).map(([language, href]) => (
                <link key={language} rel="alternate" hrefLang={language} href={toAbsoluteUrl(href, metadataBase)} />
            ))}
            {openGraph?.title && <meta property="og:title" content={openGraph.title} />}
            {openGraph?.description && <meta property="og:description" content={openGraph.description} />}
            {openGraph?.url && <meta property="og:url" content={toAbsoluteUrl(openGraph.url, metadataBase)} />}
            {openGraphImage && <meta property="og:image" content={openGraphImage} />}
            {openGraph?.type && <meta property="og:type" content={openGraph.type} />}
            {/* Next.js derives the twitter card from Open Graph data, keep that behavior */}
            {openGraph && <meta name="twitter:card" content={openGraphImage ? "summary_large_image" : "summary"} />}
            {openGraph?.title && <meta name="twitter:title" content={openGraph.title} />}
            {openGraph?.description && <meta name="twitter:description" content={openGraph.description} />}
            {openGraphImage && <meta name="twitter:image" content={openGraphImage} />}
        </>
    );
}
