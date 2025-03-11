"use client";
import { FooterContentBlock } from "@app/layout/footer/blocks/FooterContentBlock";
import { type GQLFooterFragment } from "@app/layout/footer/Footer.fragment.generated";

interface Props {
    footer: GQLFooterFragment;
}

function Footer({ footer }: Props) {
    return <FooterContentBlock data={footer.content} />;
}

export { Footer };
