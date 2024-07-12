import { FooterContentBlock } from "@src/documents/pages/blocks/FooterContentBlock";
import { gql } from "graphql-request";
import * as React from "react";

import { GQLFooterFragment } from "./Footer.generated";

interface Props {
    footer: GQLFooterFragment;
}

function Footer({ footer }: Props) {
    return <FooterContentBlock data={footer.content} />;
}

const footerFragment = gql`
    fragment Footer on Footer {
        content
    }
`;

export { Footer, footerFragment };
