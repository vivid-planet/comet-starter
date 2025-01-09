import { AllCategories } from "@comet/cms-admin";
import { GQLPageTreeNodeCategory } from "@src/graphql.generated";
import { kebabCase } from "change-case";
import { FormattedMessage } from "react-intl";

export const pageTreeCategories: AllCategories = [
    {
        category: "MainNavigation",
        label: <FormattedMessage id="menu.pageTree.mainNavigation" defaultMessage="Main navigation" />,
    },
];

export function categoryToUrlParam(category: GQLPageTreeNodeCategory | string): string {
    return kebabCase(category);
}
