import {
    AffectedEntity,
    PageTreeNodeInterface,
    PageTreeNodeVisibility,
    PageTreeService,
    RequiredPermission,
    validateNotModified,
} from "@comet/cms-api";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { UnauthorizedException } from "@nestjs/common";
import { Args, ID, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PageTreeNode } from "@src/page-tree/entities/page-tree-node.entity";

import { LinkInput } from "./dto/link.input";
import { Link } from "./entities/link.entity";

@Resolver(() => Link)
@RequiredPermission(["pageTree"])
export class LinksResolver {
    constructor(@InjectRepository(Link) readonly repository: EntityRepository<Link>, private readonly pageTreeService: PageTreeService) {}

    @Query(() => Link, { nullable: true })
    @AffectedEntity(Link)
    async link(@Args("id", { type: () => ID }) id: string): Promise<Link | null> {
        return this.repository.findOne(id);
    }

    @ResolveField(() => PageTreeNode, { nullable: true })
    async pageTreeNode(@Parent() link: Link): Promise<PageTreeNodeInterface | null> {
        return this.pageTreeService.createReadApi({ visibility: "all" }).getFirstNodeByAttachedPageId(link.id);
    }

    @Mutation(() => Link)
    @AffectedEntity(Link, { pageTreeNodeIdArg: "attachedPageTreeNodeId" })
    async saveLink(
        @Args("linkId", { type: () => ID }) linkId: string,
        @Args("input", { type: () => LinkInput }) input: LinkInput,
        @Args("lastUpdatedAt", { type: () => Date, nullable: true }) lastUpdatedAt?: Date,
        @Args("attachedPageTreeNodeId", { nullable: true, type: () => ID }) attachedPageTreeNodeId?: string,
    ): Promise<Link | null> {
        // all pageTypes need this is-archived-page-check
        if (attachedPageTreeNodeId) {
            const pageTreeNode = await this.pageTreeService.createReadApi({ visibility: "all" }).getNodeOrFail(attachedPageTreeNodeId);
            if (pageTreeNode.visibility === PageTreeNodeVisibility.Archived) {
                throw new UnauthorizedException("Archived Links cannot be updated");
            }
        }

        let link = await this.repository.findOne(linkId);

        if (link) {
            if (lastUpdatedAt) {
                validateNotModified(link, lastUpdatedAt);
            }

            link.assign({ content: input.content.transformToBlockData() });
        } else {
            link = this.repository.create({
                id: linkId,
                content: input.content.transformToBlockData(),
            });

            this.repository.persist(link);
        }

        if (attachedPageTreeNodeId) {
            await this.pageTreeService.attachDocument({ id: linkId, type: "Link" }, attachedPageTreeNodeId);
        }

        await this.repository.flush();

        return link;
    }
}
