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
import { GraphQLResolveInfo } from "graphql";

import { PaginatedProductVariants } from "./dto/paginated-product-variants";
import { ProductVariantInput, ProductVariantUpdateInput } from "./dto/product-variant.input";
import { ProductVariantsArgs } from "./dto/product-variants.args";
import { Product } from "./entities/product.entity";
import { ProductVariant } from "./entities/product-variant.entity";
import { ProductVariantsService, ProductVariantValidationError } from "./product-variants.service";

@ObjectType()
class CreateProductVariantPayload {
    @Field(() => ProductVariant, { nullable: true })
    productVariant?: ProductVariant;

    @Field(() => [ProductVariantValidationError], { nullable: false })
    errors: ProductVariantValidationError[];
}

@ObjectType()
class UpdateProductVariantPayload {
    @Field(() => ProductVariant, { nullable: true })
    productVariant?: ProductVariant;

    @Field(() => [ProductVariantValidationError], { nullable: false })
    errors: ProductVariantValidationError[];
}

@Resolver(() => ProductVariant)
@RequiredPermission(["products"])
export class ProductVariantResolver {
    constructor(private readonly productVariantsService: ProductVariantsService) {}

    @Query(() => ProductVariant)
    @AffectedEntity(ProductVariant)
    async productVariant(
        @Args("id", { type: () => ID })
        id: string,
    ): Promise<ProductVariant> {
        return this.productVariantsService.findOneById(id);
    }

    @Query(() => PaginatedProductVariants)
    @AffectedEntity(Product, { idArg: "product" })
    async productVariants(@Args() args: ProductVariantsArgs, @Info() info: GraphQLResolveInfo): Promise<PaginatedProductVariants> {
        const fields = extractGraphqlFields(info, { root: "nodes" });
        return this.productVariantsService.findAll(args, fields);
    }

    @Mutation(() => CreateProductVariantPayload)
    @AffectedEntity(Product, { idArg: "product" })
    async createProductVariant(
        @Args("product", { type: () => ID }) product: string,
        @Args("input", { type: () => ProductVariantInput }) input: ProductVariantInput,
        @GetCurrentUser() user: CurrentUser,
    ): Promise<CreateProductVariantPayload> {
        return this.productVariantsService.create(product, input, user);
    }

    @Mutation(() => UpdateProductVariantPayload)
    @AffectedEntity(ProductVariant)
    async updateProductVariant(
        @Args("id", { type: () => ID }) id: string,
        @Args("input", { type: () => ProductVariantUpdateInput }) input: ProductVariantUpdateInput,
        @GetCurrentUser() user: CurrentUser,
    ): Promise<UpdateProductVariantPayload> {
        return this.productVariantsService.update(id, input, user);
    }

    @Mutation(() => Boolean)
    @AffectedEntity(ProductVariant)
    async deleteProductVariant(
        @Args("id", { type: () => ID })
        id: string,
    ): Promise<boolean> {
        return this.productVariantsService.delete(id);
    }

    @ResolveField(() => Product)
    async product(@Parent() productVariant: ProductVariant): Promise<Product> {
        return productVariant.product.loadOrFail();
    }

    @ResolveField(() => RootBlockDataScalar(DamImageBlock), { nullable: true })
    async image(@Parent() productVariant: ProductVariant): Promise<object | undefined> {
        if (!productVariant.image) {
            return undefined;
        }
        return this.productVariantsService.transformToPlain(productVariant.image);
    }
}
