// Scaffolded by the CRUD generator on 2023-03-20.
import { AffectedEntity, CurrentUser, GetCurrentUser, RequiredPermission, validateNotModified } from "@comet/cms-api";
import { FindOptions } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Args, ID, Int, Mutation, Query, ResolveField, Resolver } from "@nestjs/graphql";

import { PaginatedProducts } from "./dto/paginated-products";
import { ProductInput } from "./dto/product.input";
import { ProductsArgs } from "./dto/products.args";
import { Product } from "./entities/product.entity";
import { ProductsAclService } from "./products.acl.service";
import { ProductsService } from "./products.service";

@Resolver(() => Product)
@RequiredPermission(["products"], { skipScopeCheck: true })
export class ProductCrudResolver {
    constructor(
        private readonly productsService: ProductsService,
        private readonly productsAclService: ProductsAclService,
        @InjectRepository(Product) private readonly repository: EntityRepository<Product>,
    ) {}

    @Query(() => Product)
    @AffectedEntity(Product)
    async product(@Args("id", { type: () => ID }) id: string): Promise<Product> {
        const product = await this.repository.findOneOrFail(id);
        return product;
    }

    @Query(() => PaginatedProducts)
    async products(@Args() { search, filter, sort, offset, limit }: ProductsArgs): Promise<PaginatedProducts> {
        const where = this.productsService.getFindCondition({ search, filter });

        const options: FindOptions<Product> = { offset, limit };

        if (sort) {
            options.orderBy = sort.map((sortItem) => {
                return {
                    [sortItem.field]: sortItem.direction,
                };
            });
        }

        const [entities, totalCount] = await this.repository.findAndCount(where, options);
        return new PaginatedProducts(entities, totalCount);
    }

    @Mutation(() => Product)
    async createProduct(@GetCurrentUser() user: CurrentUser, @Args("input", { type: () => ProductInput }) input: ProductInput): Promise<Product> {
        const product = this.repository.create({
            ...input,
            creatorId: user.id,
        });

        await this.repository.persistAndFlush(product);
        return product;
    }

    @Mutation(() => Product)
    @AffectedEntity(Product)
    async updateProduct(
        @GetCurrentUser() user: CurrentUser,
        @Args("id", { type: () => ID }) id: string,
        @Args("input", { type: () => ProductInput }) input: ProductInput,
        @Args("lastUpdatedAt", { type: () => Date, nullable: true }) lastUpdatedAt?: Date,
    ): Promise<Product> {
        const product = await this.repository.findOneOrFail(id);
        if (!this.productsAclService.isEditingAllowed(product, user)) {
            throw new Error("Editing Product not allowed");
        }
        if (lastUpdatedAt) {
            validateNotModified(product, lastUpdatedAt);
        }
        product.assign({
            ...input,
        });

        await this.repository.persistAndFlush(product);

        return product;
    }

    @Mutation(() => Boolean)
    @AffectedEntity(Product)
    async deleteProduct(@GetCurrentUser() user: CurrentUser, @Args("id", { type: () => ID }) id: string): Promise<boolean> {
        const product = await this.repository.findOneOrFail(id);
        if (!this.productsAclService.isEditingAllowed(product, user)) {
            throw new Error("Deleting Product not allowed");
        }
        await this.repository.removeAndFlush(product);

        return true;
    }

    @ResolveField(() => Int)
    sales(): number {
        return 0;
    }
}
