import { CurrentUser, gqlArgsToMikroOrmQuery, gqlSortToMikroOrmOrderBy } from "@comet/cms-api";
import { EntityManager, FindOptions, Reference } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ProductCollectionInput, ProductCollectionUpdateInput } from "@src/product-collections/dto/product-collection.input";
import { ProductCollectionScope } from "@src/product-collections/dto/product-collection-scope.input";
import { ProductCollectionsArgs } from "@src/product-collections/dto/product-collections.args";
import { ProductCollection } from "@src/product-collections/entities/product-collection.entity";
import { Product } from "@src/products/entities/product.entity";

import { PaginatedProductCollections } from "./dto/paginated-product-collections";

enum ProductCollectionValidationErrorCode {
    SLUG_ALREADY_EXISTS = "SLUG_ALREADY_EXISTS",
    VALID_TO_MUST_BE_AFTER_VALID_FROM = "VALID_TO_MUST_BE_AFTER_VALID_FROM",
}

registerEnumType(ProductCollectionValidationErrorCode, { name: "ProductCollectionValidationErrorCode" });

@ObjectType()
export class ProductCollectionValidationError {
    @Field({ nullable: true })
    field?: string;

    @Field(() => ProductCollectionValidationErrorCode)
    code: ProductCollectionValidationErrorCode;
}

@Injectable()
export class ProductCollectionsService {
    constructor(private readonly entityManager: EntityManager) {}

    async findOneById(id: string): Promise<ProductCollection> {
        return this.entityManager.findOneOrFail(ProductCollection, id);
    }

    async findAll({ scope, search, filter, sort, offset, limit }: ProductCollectionsArgs, fields?: string[]): Promise<PaginatedProductCollections> {
        const where = gqlArgsToMikroOrmQuery({ search, filter }, this.entityManager.getMetadata(ProductCollection));
        Object.assign(where, scope);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options: FindOptions<ProductCollection, any> = { offset, limit };
        if (sort) {
            options.orderBy = gqlSortToMikroOrmOrderBy(sort);
        }
        const populate: string[] = [];
        if (fields?.includes("products")) {
            populate.push("products");
        }
        if (populate.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (options as any).populate = populate;
        }
        const [entities, totalCount] = await this.entityManager.findAndCount(ProductCollection, where, options);
        return new PaginatedProductCollections(entities, totalCount);
    }

    async findBySlug(scope: ProductCollectionScope, slug: string): Promise<ProductCollection | null> {
        const productCollection = await this.entityManager.findOne(ProductCollection, { slug, ...scope });
        return productCollection ?? null;
    }

    async create(
        scope: ProductCollectionScope,
        input: ProductCollectionInput,
        user: CurrentUser,
    ): Promise<{ productCollection?: ProductCollection; errors: ProductCollectionValidationError[] }> {
        const errors = await this.validateCreateInput(input, { currentUser: user, scope });
        if (errors.length > 0) {
            return { errors };
        }

        const { products: productsInput, ...assignInput } = input;
        const productCollection = this.entityManager.create(ProductCollection, {
            ...assignInput,
            ...scope,
        });

        if (productsInput.length > 0) {
            const products = await this.entityManager.find(Product, { id: productsInput });
            if (products.length !== productsInput.length) throw new Error("Couldn't find all products that were passed as input");
            await productCollection.products.loadItems();
            productCollection.products.set(products.map((product) => Reference.create(product)));
        }

        await this.entityManager.flush();
        return { productCollection, errors: [] };
    }

    async update(
        id: string,
        input: ProductCollectionUpdateInput,
        user: CurrentUser,
    ): Promise<{ productCollection?: ProductCollection; errors: ProductCollectionValidationError[] }> {
        const productCollection = await this.entityManager.findOneOrFail(ProductCollection, id);

        const errors = await this.validateUpdateInput(input, { currentUser: user, entity: productCollection });
        if (errors.length > 0) {
            return { errors };
        }

        const { products: productsInput, ...assignInput } = input;
        productCollection.assign({ ...assignInput });

        if (productsInput !== undefined) {
            const products = await this.entityManager.find(Product, { id: productsInput });
            if (products.length !== productsInput.length) throw new Error("Couldn't find all products that were passed as input");
            await productCollection.products.loadItems();
            productCollection.products.set(products.map((product) => Reference.create(product)));
        }

        await this.entityManager.flush();
        return { productCollection, errors: [] };
    }

    async delete(id: string): Promise<boolean> {
        const productCollection = await this.entityManager.findOneOrFail(ProductCollection, id);
        this.entityManager.remove(productCollection);
        await this.entityManager.flush();
        return true;
    }

    private async validateCreateInput(
        input: ProductCollectionInput,
        context: { currentUser: CurrentUser; scope: ProductCollectionScope },
    ): Promise<ProductCollectionValidationError[]> {
        const errors: ProductCollectionValidationError[] = [];

        const existingSlug = await this.entityManager.findOne(ProductCollection, { slug: input.slug, ...context.scope });
        if (existingSlug) {
            errors.push({ field: "slug", code: ProductCollectionValidationErrorCode.SLUG_ALREADY_EXISTS });
        }

        if (input.validFrom && input.validTo && input.validTo <= input.validFrom) {
            errors.push({ field: "validTo", code: ProductCollectionValidationErrorCode.VALID_TO_MUST_BE_AFTER_VALID_FROM });
        }

        return errors;
    }

    private async validateUpdateInput(
        input: ProductCollectionUpdateInput,
        context: { currentUser: CurrentUser; entity: ProductCollection },
    ): Promise<ProductCollectionValidationError[]> {
        const errors: ProductCollectionValidationError[] = [];

        if (input.slug !== undefined) {
            const existingSlug = await this.entityManager.findOne(ProductCollection, {
                slug: input.slug,
                domain: context.entity.domain,
                language: context.entity.language,
                id: { $ne: context.entity.id },
            });
            if (existingSlug) {
                errors.push({ field: "slug", code: ProductCollectionValidationErrorCode.SLUG_ALREADY_EXISTS });
            }
        }

        const validFrom = input.validFrom !== undefined ? input.validFrom : context.entity.validFrom;
        const validTo = input.validTo !== undefined ? input.validTo : context.entity.validTo;
        if (validFrom && validTo && validTo <= validFrom) {
            errors.push({ field: "validTo", code: ProductCollectionValidationErrorCode.VALID_TO_MUST_BE_AFTER_VALID_FROM });
        }

        return errors;
    }
}
