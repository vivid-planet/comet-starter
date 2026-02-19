import { registerEnumType } from "@nestjs/graphql";

export enum PageTreeNodeCategory {
    mainNavigation = "mainNavigation",
}

registerEnumType(PageTreeNodeCategory, { name: "PageTreeNodeCategory" });
