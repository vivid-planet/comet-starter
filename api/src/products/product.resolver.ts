import {
    AffectedEntity,
    CurrentUser,
    DamImageBlock,
    extractGraphqlFields,
    GetCurrentUser,
    RequiredPermission,
    RootBlockDataScalar,
} from "@comet/cms-api";
import { Args, Field, ID, Info, Mutation, ObjectType, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { ProductCategory } from "@src/product-categories/entities/product-category.entity";
import { ProductInput, ProductUpdateInput } from "@src/products/dto/product.input";
import { ProductScope } from "@src/products/dto/product-scope.input";
import { ProductsArgs } from "@src/products/dto/products.args";
import { Product } from "@src/products/entities/product.entity";
import { GraphQLResolveInfo } from "graphql";

import { PaginatedProducts } from "./dto/paginated-products";
import { ProductsService, ProductValidationError } from "./products.service";

@ObjectType()
class CreateProductPayload {
    @Field(() => Product, { nullable: true })
    product?: Product;

    @Field(() => [ProductValidationError], { nullable: false })
    errors: ProductValidationError[];
}

@ObjectType()
class UpdateProductPayload {
    @Field(() => Product, { nullable: true })
    product?: Product;

    @Field(() => [ProductValidationError], { nullable: false })
    errors: ProductValidationError[];
}

@Resolver(() => Product)
@RequiredPermission(["products"])
export class ProductResolver {
    constructor(private readonly productsService: ProductsService) {}

    @Query(() => Product)
    @AffectedEntity(Product)
    async product(
        @Args("id", { type: () => ID })
        id: string,
    ): Promise<Product> {
        return this.productsService.findOneById(id);
    }

    @Query(() => PaginatedProducts)
    async products(@Args() args: ProductsArgs, @Info() info: GraphQLResolveInfo): Promise<PaginatedProducts> {
        const fields = extractGraphqlFields(info, { root: "nodes" });
        return this.productsService.findAll(args, fields);
    }

    @Query(() => Product, { nullable: true })
    async productBySlug(@Args("scope", { type: () => ProductScope }) scope: ProductScope, @Args("slug") slug: string): Promise<Product | null> {
        return this.productsService.findBySlug(scope, slug);
    }

    @Mutation(() => CreateProductPayload)
    async createProduct(
        @Args("scope", { type: () => ProductScope }) scope: ProductScope,
        @Args("input", { type: () => ProductInput }) input: ProductInput,
        @GetCurrentUser() user: CurrentUser,
    ): Promise<CreateProductPayload> {
        return this.productsService.create(scope, input, user);
    }

    @Mutation(() => UpdateProductPayload)
    @AffectedEntity(Product)
    async updateProduct(
        @Args("id", { type: () => ID }) id: string,
        @Args("input", { type: () => ProductUpdateInput }) input: ProductUpdateInput,
        @GetCurrentUser() user: CurrentUser,
    ): Promise<UpdateProductPayload> {
        return this.productsService.update(id, input, user);
    }

    @Mutation(() => Boolean)
    @AffectedEntity(Product)
    async deleteProduct(
        @Args("id", { type: () => ID })
        id: string,
    ): Promise<boolean> {
        return this.productsService.delete(id);
    }

    @ResolveField(() => ProductCategory, { nullable: true })
    async category(@Parent() product: Product): Promise<ProductCategory | undefined> {
        return product.category?.loadOrFail();
    }

    @ResolveField(() => RootBlockDataScalar(DamImageBlock), { nullable: true })
    async mainImage(@Parent() product: Product): Promise<object | undefined> {
        if (!product.mainImage) {
            return undefined;
        }
        return this.productsService.transformToPlain(product.mainImage);
    }
}
