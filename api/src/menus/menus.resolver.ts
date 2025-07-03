import { PageTreeNodeInterface, PageTreeNodeVisibility, PageTreeService, RequiredPermission } from "@comet/cms-api";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { PageTreeNodeScope } from "@src/page-tree/dto/page-tree-node-scope";
import { PageTreeNode } from "@src/page-tree/entities/page-tree-node.entity";
import { PageTreeNodeCategory } from "@src/page-tree/page-tree-node-category";

@Resolver()
@RequiredPermission(["pageTree"])
export class MenusResolver {
    constructor(private readonly pageTreeService: PageTreeService) {}

    @Query(() => [PageTreeNode])
    mainMenu(@Args("scope", { type: () => PageTreeNodeScope }) scope: PageTreeNodeScope): Promise<PageTreeNodeInterface[]> {
        return this.pageTreeService
            .createReadApi({ visibility: [PageTreeNodeVisibility.Published] })
            .pageTreeRootNodeList({ scope, category: PageTreeNodeCategory.mainNavigation, excludeHiddenInMenu: true });
    }
}
