import { BlockDataInterface, BlocksTransformerService, CurrentUser, gqlArgsToMikroOrmQuery, gqlSortToMikroOrmOrderBy } from "@comet/cms-api";
import { EntityManager, FindOptions, Reference } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Field, ObjectType } from "@nestjs/graphql";

import { PaginatedProductVariants } from "./dto/paginated-product-variants";
import { ProductVariantInput, ProductVariantUpdateInput } from "./dto/product-variant.input";
import { ProductVariantsArgs } from "./dto/product-variants.args";
import { Product } from "./entities/product.entity";
import { ProductVariant } from "./entities/product-variant.entity";

@ObjectType()
export class ProductVariantValidationError {
    @Field({ nullable: true })
    field?: string;

    @Field()
    code: string;
}

@Injectable()
export class ProductVariantsService {
    constructor(
        private readonly entityManager: EntityManager,
        private readonly blocksTransformer: BlocksTransformerService,
    ) {}

    async findOneById(id: string): Promise<ProductVariant> {
        return this.entityManager.findOneOrFail(ProductVariant, id);
    }

    async findAll({ product, search, filter, sort, offset, limit }: ProductVariantsArgs, fields?: string[]): Promise<PaginatedProductVariants> {
        const where = gqlArgsToMikroOrmQuery({ search, filter }, this.entityManager.getMetadata(ProductVariant));
        where.product = product;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options: FindOptions<ProductVariant, any> = { offset, limit };
        if (sort) {
            options.orderBy = gqlSortToMikroOrmOrderBy(sort);
        }
        const populate: string[] = [];
        if (fields?.includes("product")) {
            populate.push("product");
        }
        if (populate.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (options as any).populate = populate;
        }
        const [entities, totalCount] = await this.entityManager.findAndCount(ProductVariant, where, options);
        return new PaginatedProductVariants(entities, totalCount);
    }

    async create(
        product: string,
        input: ProductVariantInput,
        user: CurrentUser,
    ): Promise<{ productVariant?: ProductVariant; errors: ProductVariantValidationError[] }> {
        const errors = await this.validateCreateInput(input, { currentUser: user, args: { product } });
        if (errors.length > 0) {
            return { errors };
        }

        const { image: imageInput, ...assignInput } = input;
        const productVariant = this.entityManager.create(ProductVariant, {
            ...assignInput,
            product: Reference.create(await this.entityManager.findOneOrFail(Product, product)),
            ...(imageInput ? { image: imageInput.transformToBlockData() } : {}),
        });
        await this.entityManager.flush();
        return { productVariant, errors: [] };
    }

    async update(
        id: string,
        input: ProductVariantUpdateInput,
        user: CurrentUser,
    ): Promise<{ productVariant?: ProductVariant; errors: ProductVariantValidationError[] }> {
        const productVariant = await this.entityManager.findOneOrFail(ProductVariant, id);

        const errors = await this.validateUpdateInput(input, { currentUser: user, entity: productVariant });
        if (errors.length > 0) {
            return { errors };
        }

        const { image: imageInput, ...assignInput } = input;
        productVariant.assign({ ...assignInput });
        if (imageInput) {
            productVariant.image = imageInput.transformToBlockData();
        }
        await this.entityManager.flush();
        return { productVariant, errors: [] };
    }

    async delete(id: string): Promise<boolean> {
        const productVariant = await this.entityManager.findOneOrFail(ProductVariant, id);
        this.entityManager.remove(productVariant);
        await this.entityManager.flush();
        return true;
    }

    async transformToPlain(blockData: BlockDataInterface): Promise<object> {
        return this.blocksTransformer.transformToPlain(blockData);
    }

    private async validateCreateInput(
        input: ProductVariantInput,
        context: { currentUser: CurrentUser; args: { product: string } },
    ): Promise<ProductVariantValidationError[]> {
        const errors: ProductVariantValidationError[] = [];

        const existingSku = await this.entityManager.findOne(ProductVariant, { sku: input.sku, product: context.args.product });
        if (existingSku) {
            errors.push({ field: "sku", code: "SKU_ALREADY_EXISTS" });
        }

        return errors;
    }

    private async validateUpdateInput(
        input: ProductVariantUpdateInput,
        context: { currentUser: CurrentUser; entity: ProductVariant },
    ): Promise<ProductVariantValidationError[]> {
        const errors: ProductVariantValidationError[] = [];

        if (input.sku !== undefined) {
            const existingSku = await this.entityManager.findOne(ProductVariant, {
                sku: input.sku,
                product: context.entity.product,
                id: { $ne: context.entity.id },
            });
            if (existingSku) {
                errors.push({ field: "sku", code: "SKU_ALREADY_EXISTS" });
            }
        }

        return errors;
    }
}
