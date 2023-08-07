import { registerEnumType } from "@nestjs/graphql";

export enum PageTreeNodeCategory {
    MainNavigation = "MainNavigation",
}

registerEnumType(PageTreeNodeCategory, { name: "PageTreeNodeCategory" });
