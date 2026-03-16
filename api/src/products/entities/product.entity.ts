import { BlockDataInterface, DamImageBlock, RootBlock, RootBlockDataScalar, RootBlockEntity, RootBlockType, ScopedEntity } from "@comet/cms-api";
import { BaseEntity, Collection, Entity, Enum, ManyToOne, OneToMany, OptionalProps, PrimaryKey, Property, Ref } from "@mikro-orm/postgresql";
import { Field, Float, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { ProductCategory } from "@src/product-categories/entities/product-category.entity";
import { v4 as uuid } from "uuid";

import { ProductVariant } from "./product-variant.entity";

export enum ProductStatus {
    Draft = "Draft",
    InReview = "InReview",
    Published = "Published",
    Archived = "Archived",
}

registerEnumType(ProductStatus, { name: "ProductStatus" });

export enum ProductType {
    Physical = "Physical",
    Digital = "Digital",
    Subscription = "Subscription",
}

registerEnumType(ProductType, { name: "ProductType" });

@Entity()
@ObjectType()
@RootBlockEntity()
@ScopedEntity((product) => ({
    domain: product.domain,
    language: product.language,
}))
export class Product extends BaseEntity {
    [OptionalProps]?: "createdAt" | "updatedAt" | "isPublished" | "productStatus";

    @PrimaryKey({ type: "uuid" })
    @Field(() => ID)
    id: string = uuid();

    @Property({ type: "text" })
    @Field()
    name: string;

    @Property({ type: "text" })
    @Field()
    slug: string;

    @Property({ type: "text", nullable: true })
    @Field({ nullable: true })
    description?: string;

    @Property({ type: "float" })
    @Field(() => Float)
    price: number;

    @Property({ type: "text" })
    @Field()
    sku: string;

    @Property({ type: "timestamp with time zone", nullable: true })
    @Field({ nullable: true })
    publishedAt?: Date;

    @Property({ type: "boolean" })
    @Field()
    isPublished: boolean = false;

    @Enum({ items: () => ProductStatus })
    @Field(() => ProductStatus)
    productStatus: ProductStatus = ProductStatus.Draft;

    @Enum({ items: () => ProductType })
    @Field(() => ProductType)
    productType: ProductType;

    @ManyToOne(() => ProductCategory, { ref: true, nullable: true })
    @Field(() => ProductCategory, { nullable: true })
    category?: Ref<ProductCategory>;

    @RootBlock(DamImageBlock)
    @Property({ type: new RootBlockType(DamImageBlock), nullable: true })
    @Field(() => RootBlockDataScalar(DamImageBlock), { nullable: true })
    mainImage?: BlockDataInterface;

    @Property({ type: "text" })
    @Field()
    domain: string;

    @Property({ type: "text" })
    @Field()
    language: string;

    @OneToMany(() => ProductVariant, (variant) => variant.product)
    variants = new Collection<ProductVariant>(this);

    @Property({ type: "timestamp with time zone" })
    @Field()
    createdAt: Date = new Date();

    @Property({ type: "timestamp with time zone", onUpdate: () => new Date() })
    @Field()
    updatedAt: Date = new Date();
}
