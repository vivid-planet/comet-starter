"use client";
import { FooterContentBlock } from "@src/documents/pages/blocks/FooterContentBlock";
import { GQLFooterFragment } from "@src/layout/footer/Footer.fragment.generated";

interface Props {
    footer: GQLFooterFragment;
}

function Footer({ footer }: Props) {
    return <FooterContentBlock data={footer.content} />;
}

export { Footer };
