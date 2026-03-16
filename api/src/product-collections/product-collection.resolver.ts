import { AffectedEntity, CurrentUser, extractGraphqlFields, GetCurrentUser, RequiredPermission } from "@comet/cms-api";
import { Args, Field, ID, Info, Int, Mutation, ObjectType, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { PaginatedProductCollections } from "@src/product-collections/dto/paginated-product-collections";
import { ProductCollectionInput, ProductCollectionUpdateInput } from "@src/product-collections/dto/product-collection.input";
import { ProductCollectionScope } from "@src/product-collections/dto/product-collection-scope.input";
import { ProductCollectionsArgs } from "@src/product-collections/dto/product-collections.args";
import { ProductCollection } from "@src/product-collections/entities/product-collection.entity";
import { Product } from "@src/products/entities/product.entity";
import { GraphQLResolveInfo } from "graphql";

import { ProductCollectionsService, ProductCollectionValidationError } from "./product-collections.service";

@ObjectType()
class CreateProductCollectionPayload {
    @Field(() => ProductCollection, { nullable: true })
    productCollection?: ProductCollection;

    @Field(() => [ProductCollectionValidationError], { nullable: false })
    errors: ProductCollectionValidationError[];
}

@ObjectType()
class UpdateProductCollectionPayload {
    @Field(() => ProductCollection, { nullable: true })
    productCollection?: ProductCollection;

    @Field(() => [ProductCollectionValidationError], { nullable: false })
    errors: ProductCollectionValidationError[];
}

@Resolver(() => ProductCollection)
@RequiredPermission(["productCollections"])
export class ProductCollectionResolver {
    constructor(private readonly productCollectionsService: ProductCollectionsService) {}

    @Query(() => ProductCollection)
    @AffectedEntity(ProductCollection)
    async productCollection(
        @Args("id", { type: () => ID })
        id: string,
    ): Promise<ProductCollection> {
        return this.productCollectionsService.findOneById(id);
    }

    @Query(() => PaginatedProductCollections)
    async productCollections(@Args() args: ProductCollectionsArgs, @Info() info: GraphQLResolveInfo): Promise<PaginatedProductCollections> {
        const fields = extractGraphqlFields(info, { root: "nodes" });
        return this.productCollectionsService.findAll(args, fields);
    }

    @Query(() => ProductCollection, { nullable: true })
    async productCollectionBySlug(
        @Args("scope", { type: () => ProductCollectionScope }) scope: ProductCollectionScope,
        @Args("slug") slug: string,
    ): Promise<ProductCollection | null> {
        return this.productCollectionsService.findBySlug(scope, slug);
    }

    @Mutation(() => CreateProductCollectionPayload)
    async createProductCollection(
        @Args("scope", { type: () => ProductCollectionScope }) scope: ProductCollectionScope,
        @Args("input", { type: () => ProductCollectionInput }) input: ProductCollectionInput,
        @GetCurrentUser() user: CurrentUser,
    ): Promise<CreateProductCollectionPayload> {
        return this.productCollectionsService.create(scope, input, user);
    }

    @Mutation(() => UpdateProductCollectionPayload)
    @AffectedEntity(ProductCollection)
    async updateProductCollection(
        @Args("id", { type: () => ID }) id: string,
        @Args("input", { type: () => ProductCollectionUpdateInput }) input: ProductCollectionUpdateInput,
        @GetCurrentUser() user: CurrentUser,
    ): Promise<UpdateProductCollectionPayload> {
        return this.productCollectionsService.update(id, input, user);
    }

    @Mutation(() => Boolean)
    @AffectedEntity(ProductCollection)
    async deleteProductCollection(
        @Args("id", { type: () => ID })
        id: string,
    ): Promise<boolean> {
        return this.productCollectionsService.delete(id);
    }

    @ResolveField(() => [Product])
    async products(@Parent() productCollection: ProductCollection): Promise<Product[]> {
        return productCollection.products.loadItems();
    }

    @ResolveField(() => Int)
    async productCount(@Parent() productCollection: ProductCollection): Promise<number> {
        return productCollection.products.loadCount();
    }
}
