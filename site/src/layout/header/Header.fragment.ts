import { gql } from "@comet/cms-site";

import { pageLinkFragment } from "./PageLink.fragment";

export const headerFragment = gql`
    fragment Header on PageTreeNode {
        id
        name
        ...PageLink
        childNodes {
            id
            name
            ...PageLink
        }
    }

    ${pageLinkFragment}
`;
