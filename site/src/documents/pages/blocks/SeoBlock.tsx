import { generateImageUrl, PropsWithData } from "@comet/cms-site";
import { SeoBlockData } from "@src/blocks.generated";
import { useContentScope } from "@src/common/contentScope/ContentScope";
import Head from "next/head";
import * as React from "react";

interface SeoBlockProps extends PropsWithData<SeoBlockData> {
    title: string;
    canonicalUrl: string;
}
export const SeoBlock: React.FunctionComponent<SeoBlockProps> = ({
    data: { htmlTitle, metaDescription, openGraphTitle, openGraphDescription, openGraphImage, noIndex, alternativeLinks },
    title,
    canonicalUrl,
}) => {
    const { language } = useContentScope();
    const usedHtmlTitle = htmlTitle && htmlTitle != "" ? htmlTitle : title;
    return (
        <>
            <Head>
                <title>{usedHtmlTitle}</title>

                {/* Meta*/}
                {metaDescription && <meta name="description" content={metaDescription} />}
                <link rel="canonical" href={canonicalUrl} />
                <link rel="alternate" hrefLang={language} href={canonicalUrl} />
                {alternativeLinks.map((link) => (
                    <link key={link.code} rel="alternate" hrefLang={link.code} href={link.url} />
                ))}

                {/* Open Graph */}
                {openGraphTitle && <meta property={"og:title"} content={openGraphTitle} />}
                {openGraphDescription && <meta property={"og:description"} content={openGraphDescription} />}
                <meta property={"og:type"} content={"website"} />
                <meta property={"og:url"} content={canonicalUrl} />
                {openGraphImage.block?.urlTemplate && (
                    <meta property={"og:image"} content={generateImageUrl({ src: openGraphImage.block.urlTemplate, width: 1024 }, 1 / 1)} />
                )}

                {/* No Index */}
                {noIndex && (
                    <>
                        <meta name={"robots"} content={"noindex"} />
                    </>
                )}
            </Head>
        </>
    );
};
