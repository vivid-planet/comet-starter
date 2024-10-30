import { gql } from "@comet/cms-site";

export const mobileMenuFragment = gql`
    fragment MobileMenu on PageTreeNode {
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
    }
`;
