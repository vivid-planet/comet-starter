import { gql } from "@dextinity/site-react";

export const desktopMenuFragment = gql`
    fragment DesktopMenu on PageTreeNode {
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
