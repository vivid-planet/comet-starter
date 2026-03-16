import { AffectedEntity, extractGraphqlFields, RequiredPermission } from "@comet/cms-api";
import { Args, ID, Info, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { ProductReviewInput, ProductReviewUpdateInput } from "@src/products/dto/product-review.input";
import { ProductReviewsArgs } from "@src/products/dto/product-reviews.args";
import { Product } from "@src/products/entities/product.entity";
import { ProductReview } from "@src/products/entities/product-review.entity";
import { GraphQLResolveInfo } from "graphql";

import { PaginatedProductReviews } from "./dto/paginated-product-reviews";
import { ProductReviewsService } from "./product-reviews.service";

@Resolver(() => ProductReview)
@RequiredPermission(["productReviews"], { skipScopeCheck: true })
export class ProductReviewResolver {
    constructor(private readonly productReviewsService: ProductReviewsService) {}

    @Query(() => ProductReview)
    @AffectedEntity(ProductReview)
    async productReview(
        @Args("id", { type: () => ID })
        id: string,
    ): Promise<ProductReview> {
        return this.productReviewsService.findOneById(id);
    }

    @Query(() => PaginatedProductReviews)
    async productReviews(@Args() args: ProductReviewsArgs, @Info() info: GraphQLResolveInfo): Promise<PaginatedProductReviews> {
        const fields = extractGraphqlFields(info, { root: "nodes" });
        return this.productReviewsService.findAll(args, fields);
    }

    @Mutation(() => ProductReview)
    async createProductReview(@Args("input", { type: () => ProductReviewInput }) input: ProductReviewInput): Promise<ProductReview> {
        return this.productReviewsService.create(input);
    }

    @Mutation(() => ProductReview)
    @AffectedEntity(ProductReview)
    async updateProductReview(
        @Args("id", { type: () => ID }) id: string,
        @Args("input", { type: () => ProductReviewUpdateInput }) input: ProductReviewUpdateInput,
    ): Promise<ProductReview> {
        return this.productReviewsService.update(id, input);
    }

    @Mutation(() => Boolean)
    @AffectedEntity(ProductReview)
    async deleteProductReview(
        @Args("id", { type: () => ID })
        id: string,
    ): Promise<boolean> {
        return this.productReviewsService.delete(id);
    }

    @ResolveField(() => Product)
    async product(@Parent() productReview: ProductReview): Promise<Product> {
        return productReview.product.loadOrFail();
    }
}
