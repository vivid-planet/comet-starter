import { BlockDataInterface, BlocksTransformerService, CurrentUser, gqlArgsToMikroOrmQuery, gqlSortToMikroOrmOrderBy } from "@comet/cms-api";
import { EntityManager, FindOptions } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ProductInput, ProductUpdateInput } from "@src/products/dto/product.input";
import { ProductScope } from "@src/products/dto/product-scope.input";
import { ProductsArgs } from "@src/products/dto/products.args";
import { Product } from "@src/products/entities/product.entity";

import { PaginatedProducts } from "./dto/paginated-products";

enum ProductValidationErrorCode {
    SLUG_ALREADY_EXISTS = "SLUG_ALREADY_EXISTS",
    SKU_ALREADY_EXISTS = "SKU_ALREADY_EXISTS",
}

registerEnumType(ProductValidationErrorCode, { name: "ProductValidationErrorCode" });

@ObjectType()
export class ProductValidationError {
    @Field({ nullable: true })
    field?: string;

    @Field(() => ProductValidationErrorCode)
    code: ProductValidationErrorCode;
}

@Injectable()
export class ProductsService {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly blocksTransformer: BlocksTransformerService,
    ) {}

    async findOneById(id: string): Promise<Product> {
        return this.entityManager.findOneOrFail(Product, id);
    }

    async findAll({ scope, search, filter, sort, offset, limit }: ProductsArgs): Promise<PaginatedProducts> {
        const where = gqlArgsToMikroOrmQuery({ search, filter }, this.entityManager.getMetadata(Product));
        Object.assign(where, scope);
        const options: FindOptions<Product> = { offset, limit };
        if (sort) {
            options.orderBy = gqlSortToMikroOrmOrderBy(sort);
        }
        const [entities, totalCount] = await this.entityManager.findAndCount(Product, where, options);
        return new PaginatedProducts(entities, totalCount);
    }

    async findBySlug(scope: ProductScope, slug: string): Promise<Product | null> {
        const product = await this.entityManager.findOne(Product, { slug, ...scope });
        return product ?? null;
    }

    async create(scope: ProductScope, input: ProductInput, user: CurrentUser): Promise<{ product?: Product; errors: ProductValidationError[] }> {
        const errors = await this.validateCreateInput(input, { currentUser: user, scope });
        if (errors.length > 0) {
            return { errors };
        }

        const { mainImage: mainImageInput, ...assignInput } = input;
        const product = this.entityManager.create(Product, {
            ...assignInput,
            ...scope,
            ...(mainImageInput ? { mainImage: mainImageInput.transformToBlockData() } : {}),
        });
        await this.entityManager.flush();
        return { product, errors: [] };
    }

    async update(id: string, input: ProductUpdateInput, user: CurrentUser): Promise<{ product?: Product; errors: ProductValidationError[] }> {
        const product = await this.entityManager.findOneOrFail(Product, id);

        const errors = await this.validateUpdateInput(input, { currentUser: user, entity: product });
        if (errors.length > 0) {
            return { errors };
        }

        const { mainImage: mainImageInput, ...assignInput } = input;
        product.assign({ ...assignInput });
        if (mainImageInput) {
            product.mainImage = mainImageInput.transformToBlockData();
        }
        await this.entityManager.flush();
        return { product, errors: [] };
    }

    async delete(id: string): Promise<boolean> {
        const product = await this.entityManager.findOneOrFail(Product, id);
        this.entityManager.remove(product);
        await this.entityManager.flush();
        return true;
    }

    async transformToPlain(blockData: BlockDataInterface): Promise<object> {
        return this.blocksTransformer.transformToPlain(blockData);
    }

    private async validateCreateInput(
        input: ProductInput,
        context: { currentUser: CurrentUser; scope: ProductScope },
    ): Promise<ProductValidationError[]> {
        const errors: ProductValidationError[] = [];

        const existingSlug = await this.entityManager.findOne(Product, { slug: input.slug, ...context.scope });
        if (existingSlug) {
            errors.push({ field: "slug", code: ProductValidationErrorCode.SLUG_ALREADY_EXISTS });
        }

        const existingSku = await this.entityManager.findOne(Product, { sku: input.sku, ...context.scope });
        if (existingSku) {
            errors.push({ field: "sku", code: ProductValidationErrorCode.SKU_ALREADY_EXISTS });
        }

        return errors;
    }

    private async validateUpdateInput(
        input: ProductUpdateInput,
        context: { currentUser: CurrentUser; entity: Product },
    ): Promise<ProductValidationError[]> {
        const errors: ProductValidationError[] = [];

        if (input.slug !== undefined) {
            const existingSlug = await this.entityManager.findOne(Product, {
                slug: input.slug,
                domain: context.entity.domain,
                language: context.entity.language,
                id: { $ne: context.entity.id },
            });
            if (existingSlug) {
                errors.push({ field: "slug", code: ProductValidationErrorCode.SLUG_ALREADY_EXISTS });
            }
        }

        if (input.sku !== undefined) {
            const existingSku = await this.entityManager.findOne(Product, {
                sku: input.sku,
                domain: context.entity.domain,
                language: context.entity.language,
                id: { $ne: context.entity.id },
            });
            if (existingSku) {
                errors.push({ field: "sku", code: ProductValidationErrorCode.SKU_ALREADY_EXISTS });
            }
        }

        return errors;
    }
}
