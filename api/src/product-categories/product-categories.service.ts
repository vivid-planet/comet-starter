import { CurrentUser, gqlArgsToMikroOrmQuery, gqlSortToMikroOrmOrderBy } from "@comet/cms-api";
import { EntityManager, FilterQuery, FindOptions, raw, Reference } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";
import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ProductCategoriesArgs } from "@src/product-categories/dto/product-categories.args";
import { ProductCategoryInput, ProductCategoryUpdateInput } from "@src/product-categories/dto/product-category.input";
import { ProductCategoryScope } from "@src/product-categories/dto/product-category-scope.input";
import { ProductCategory } from "@src/product-categories/entities/product-category.entity";

import { PaginatedProductCategories } from "./dto/paginated-product-categories";

enum ProductCategoryValidationErrorCode {
    SLUG_ALREADY_EXISTS = "SLUG_ALREADY_EXISTS",
}

registerEnumType(ProductCategoryValidationErrorCode, { name: "ProductCategoryValidationErrorCode" });

@ObjectType()
export class ProductCategoryValidationError {
    @Field({ nullable: true })
    field?: string;

    @Field(() => ProductCategoryValidationErrorCode)
    code: ProductCategoryValidationErrorCode;
}

@Injectable()
export class ProductCategoriesService {
    constructor(private readonly entityManager: EntityManager) {}

    async findOneById(id: string): Promise<ProductCategory> {
        return this.entityManager.findOneOrFail(ProductCategory, id);
    }

    async findAll({ scope, search, filter, sort, offset, limit }: ProductCategoriesArgs, fields?: string[]): Promise<PaginatedProductCategories> {
        const where = gqlArgsToMikroOrmQuery({ search, filter }, this.entityManager.getMetadata(ProductCategory));
        Object.assign(where, scope);
        const options: FindOptions<ProductCategory> = { offset, limit };
        if (sort) {
            options.orderBy = gqlSortToMikroOrmOrderBy(sort);
        }
        const populate: string[] = [];
        if (fields?.includes("parentCategory")) {
            populate.push("parentCategory");
        }
        if (populate.length > 0) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            options.populate = populate as any;
        }
        const [entities, totalCount] = await this.entityManager.findAndCount(ProductCategory, where, options);
        return new PaginatedProductCategories(entities, totalCount);
    }

    async findBySlug(scope: ProductCategoryScope, slug: string): Promise<ProductCategory | null> {
        const productCategory = await this.entityManager.findOne(ProductCategory, { slug, ...scope });
        return productCategory ?? null;
    }

    async create(
        scope: ProductCategoryScope,
        input: ProductCategoryInput,
        user: CurrentUser,
    ): Promise<{ productCategory?: ProductCategory; errors: ProductCategoryValidationError[] }> {
        const errors = await this.validateCreateInput(input, { currentUser: user, scope });
        if (errors.length > 0) {
            return { errors };
        }

        const { parentCategory: parentCategoryInput, ...assignInput } = input;
        const group = { domain: scope.domain, language: scope.language };
        const lastPosition = await this.getLastPosition(group);
        let position = assignInput.position;
        if (position !== undefined && position < lastPosition + 1) {
            await this.incrementPositions(group, position);
        } else {
            position = lastPosition + 1;
        }

        const productCategory = this.entityManager.create(ProductCategory, {
            ...assignInput,
            ...scope,
            position,
            ...(parentCategoryInput
                ? { parentCategory: Reference.create(await this.entityManager.findOneOrFail(ProductCategory, parentCategoryInput)) }
                : {}),
        });
        await this.entityManager.flush();
        return { productCategory, errors: [] };
    }

    async update(
        id: string,
        input: ProductCategoryUpdateInput,
        user: CurrentUser,
    ): Promise<{ productCategory?: ProductCategory; errors: ProductCategoryValidationError[] }> {
        const productCategory = await this.entityManager.findOneOrFail(ProductCategory, id);

        const errors = await this.validateUpdateInput(input, { currentUser: user, entity: productCategory });
        if (errors.length > 0) {
            return { errors };
        }

        const { parentCategory: parentCategoryInput, ...assignInput } = input;
        const group = { domain: productCategory.domain, language: productCategory.language };

        if (assignInput.position !== undefined) {
            const lastPosition = await this.getLastPosition(group);
            if (assignInput.position > lastPosition) {
                assignInput.position = lastPosition;
            }
            if (productCategory.position < assignInput.position) {
                await this.decrementPositions(group, productCategory.position, assignInput.position);
            } else if (productCategory.position > assignInput.position) {
                await this.incrementPositions(group, assignInput.position, productCategory.position);
            }
        }

        productCategory.assign({ ...assignInput });

        if (parentCategoryInput !== undefined) {
            productCategory.parentCategory = parentCategoryInput
                ? Reference.create(await this.entityManager.findOneOrFail(ProductCategory, parentCategoryInput))
                : undefined;
        }

        await this.entityManager.flush();
        return { productCategory, errors: [] };
    }

    async delete(id: string): Promise<boolean> {
        const productCategory = await this.entityManager.findOneOrFail(ProductCategory, id);
        const group = { domain: productCategory.domain, language: productCategory.language };
        this.entityManager.remove(productCategory);
        await this.decrementPositions(group, productCategory.position);
        await this.entityManager.flush();
        return true;
    }

    private async incrementPositions(group: { domain: string; language: string }, lowestPosition: number, highestPosition?: number) {
        await this.entityManager.nativeUpdate(
            ProductCategory,
            {
                $and: [
                    { position: { $gte: lowestPosition, ...(highestPosition ? { $lt: highestPosition } : {}) } },
                    this.getPositionGroupCondition(group),
                ],
            },
            { position: raw("position + 1") },
        );
    }

    private async decrementPositions(group: { domain: string; language: string }, lowestPosition: number, highestPosition?: number) {
        await this.entityManager.nativeUpdate(
            ProductCategory,
            {
                $and: [
                    { position: { $gt: lowestPosition, ...(highestPosition ? { $lte: highestPosition } : {}) } },
                    this.getPositionGroupCondition(group),
                ],
            },
            { position: raw("position - 1") },
        );
    }

    private async getLastPosition(group: { domain: string; language: string }) {
        return this.entityManager.count(ProductCategory, this.getPositionGroupCondition(group));
    }

    private getPositionGroupCondition(group: { domain: string; language: string }): FilterQuery<ProductCategory> {
        return { domain: group.domain, language: group.language };
    }

    private async validateCreateInput(
        input: ProductCategoryInput,
        context: { currentUser: CurrentUser; scope: ProductCategoryScope },
    ): Promise<ProductCategoryValidationError[]> {
        const errors: ProductCategoryValidationError[] = [];

        const existingSlug = await this.entityManager.findOne(ProductCategory, { slug: input.slug, ...context.scope });
        if (existingSlug) {
            errors.push({ field: "slug", code: ProductCategoryValidationErrorCode.SLUG_ALREADY_EXISTS });
        }

        return errors;
    }

    private async validateUpdateInput(
        input: ProductCategoryUpdateInput,
        context: { currentUser: CurrentUser; entity: ProductCategory },
    ): Promise<ProductCategoryValidationError[]> {
        const errors: ProductCategoryValidationError[] = [];

        if (input.slug !== undefined) {
            const existingSlug = await this.entityManager.findOne(ProductCategory, {
                slug: input.slug,
                domain: context.entity.domain,
                language: context.entity.language,
                id: { $ne: context.entity.id },
            });
            if (existingSlug) {
                errors.push({ field: "slug", code: ProductCategoryValidationErrorCode.SLUG_ALREADY_EXISTS });
            }
        }

        return errors;
    }
}
