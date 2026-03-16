import { AffectedEntity, CurrentUser, extractGraphqlFields, GetCurrentUser, RequiredPermission } from "@comet/cms-api";
import { Args, Field, ID, Info, Mutation, ObjectType, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { ProductCategoriesArgs } from "@src/product-categories/dto/product-categories.args";
import { ProductCategoryInput, ProductCategoryUpdateInput } from "@src/product-categories/dto/product-category.input";
import { ProductCategoryScope } from "@src/product-categories/dto/product-category-scope.input";
import { ProductCategory } from "@src/product-categories/entities/product-category.entity";
import { GraphQLResolveInfo } from "graphql";

import { PaginatedProductCategories } from "./dto/paginated-product-categories";
import { ProductCategoriesService, ProductCategoryValidationError } from "./product-categories.service";

@ObjectType()
class CreateProductCategoryPayload {
    @Field(() => ProductCategory, { nullable: true })
    productCategory?: ProductCategory;

    @Field(() => [ProductCategoryValidationError], { nullable: false })
    errors: ProductCategoryValidationError[];
}

@ObjectType()
class UpdateProductCategoryPayload {
    @Field(() => ProductCategory, { nullable: true })
    productCategory?: ProductCategory;

    @Field(() => [ProductCategoryValidationError], { nullable: false })
    errors: ProductCategoryValidationError[];
}

@Resolver(() => ProductCategory)
@RequiredPermission(["productCategories"])
export class ProductCategoryResolver {
    constructor(private readonly productCategoriesService: ProductCategoriesService) {}

    @Query(() => ProductCategory)
    @AffectedEntity(ProductCategory)
    async productCategory(
        @Args("id", { type: () => ID })
        id: string,
    ): Promise<ProductCategory> {
        return this.productCategoriesService.findOneById(id);
    }

    @Query(() => PaginatedProductCategories)
    async productCategories(@Args() args: ProductCategoriesArgs, @Info() info: GraphQLResolveInfo): Promise<PaginatedProductCategories> {
        const fields = extractGraphqlFields(info, { root: "nodes" });
        return this.productCategoriesService.findAll(args, fields);
    }

    @Query(() => ProductCategory, { nullable: true })
    async productCategoryBySlug(
        @Args("scope", { type: () => ProductCategoryScope }) scope: ProductCategoryScope,
        @Args("slug") slug: string,
    ): Promise<ProductCategory | null> {
        return this.productCategoriesService.findBySlug(scope, slug);
    }

    @Mutation(() => CreateProductCategoryPayload)
    async createProductCategory(
        @Args("scope", { type: () => ProductCategoryScope }) scope: ProductCategoryScope,
        @Args("input", { type: () => ProductCategoryInput }) input: ProductCategoryInput,
        @GetCurrentUser() user: CurrentUser,
    ): Promise<CreateProductCategoryPayload> {
        return this.productCategoriesService.create(scope, input, user);
    }

    @Mutation(() => UpdateProductCategoryPayload)
    @AffectedEntity(ProductCategory)
    async updateProductCategory(
        @Args("id", { type: () => ID }) id: string,
        @Args("input", { type: () => ProductCategoryUpdateInput }) input: ProductCategoryUpdateInput,
        @GetCurrentUser() user: CurrentUser,
    ): Promise<UpdateProductCategoryPayload> {
        return this.productCategoriesService.update(id, input, user);
    }

    @Mutation(() => Boolean)
    @AffectedEntity(ProductCategory)
    async deleteProductCategory(
        @Args("id", { type: () => ID })
        id: string,
    ): Promise<boolean> {
        return this.productCategoriesService.delete(id);
    }

    @ResolveField(() => ProductCategory, { nullable: true })
    async parentCategory(@Parent() productCategory: ProductCategory): Promise<ProductCategory | undefined> {
        return productCategory.parentCategory?.loadOrFail();
    }
}
