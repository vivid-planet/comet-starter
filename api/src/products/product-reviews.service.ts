import { gqlArgsToMikroOrmQuery, gqlSortToMikroOrmOrderBy } from "@comet/cms-api";
import { EntityManager, FindOptions, Reference } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { ProductReviewInput, ProductReviewUpdateInput } from "@src/products/dto/product-review.input";
import { ProductReviewsArgs } from "@src/products/dto/product-reviews.args";
import { Product } from "@src/products/entities/product.entity";
import { ProductReview } from "@src/products/entities/product-review.entity";

import { PaginatedProductReviews } from "./dto/paginated-product-reviews";

@Injectable()
export class ProductReviewsService {
    constructor(private readonly entityManager: EntityManager) {}

    async findOneById(id: string): Promise<ProductReview> {
        return this.entityManager.findOneOrFail(ProductReview, id);
    }

    async findAll({ search, filter, sort, offset, limit }: ProductReviewsArgs, fields?: string[]): Promise<PaginatedProductReviews> {
        const where = gqlArgsToMikroOrmQuery({ search, filter }, this.entityManager.getMetadata(ProductReview));
        const options: FindOptions<ProductReview> = { offset, limit };
        if (sort) {
            options.orderBy = gqlSortToMikroOrmOrderBy(sort);
        }
        const populate: string[] = [];
        if (fields?.includes("product")) {
            populate.push("product");
        }
        if (populate.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            options.populate = populate as any;
        }
        const [entities, totalCount] = await this.entityManager.findAndCount(ProductReview, where, options);
        return new PaginatedProductReviews(entities, totalCount);
    }

    async create(input: ProductReviewInput): Promise<ProductReview> {
        const { product: productInput, ...assignInput } = input;
        const productReview = this.entityManager.create(ProductReview, {
            ...assignInput,
            product: Reference.create(await this.entityManager.findOneOrFail(Product, productInput)),
        });
        await this.entityManager.flush();
        return productReview;
    }

    async update(id: string, input: ProductReviewUpdateInput): Promise<ProductReview> {
        const productReview = await this.entityManager.findOneOrFail(ProductReview, id);
        const { product: productInput, ...assignInput } = input;
        productReview.assign({ ...assignInput });
        if (productInput !== undefined) {
            productReview.product = Reference.create(await this.entityManager.findOneOrFail(Product, productInput));
        }
        await this.entityManager.flush();
        return productReview;
    }

    async delete(id: string): Promise<boolean> {
        const productReview = await this.entityManager.findOneOrFail(ProductReview, id);
        this.entityManager.remove(productReview);
        await this.entityManager.flush();
        return true;
    }
}
