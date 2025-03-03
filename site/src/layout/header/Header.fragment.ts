import { gql } from "@comet/cms-site";
import { mobileMenuFragment } from "@src/layout/header/MobileMenu.fragment";

import { pageLinkFragment } from "./PageLink.fragment";

export const headerFragment = gql`
    fragment Header on PageTreeNode {
        id
        name
        hideInMenu
        ...PageLink
        childNodes {
            id
            name
            hideInMenu
            ...PageLink
        }
        ...MobileMenu
    }

    ${pageLinkFragment}
    ${mobileMenuFragment}
`;
