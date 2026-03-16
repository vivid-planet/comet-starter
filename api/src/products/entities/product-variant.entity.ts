import { BlockDataInterface, DamImageBlock, RootBlock, RootBlockDataScalar, RootBlockEntity, RootBlockType, ScopedEntity } from "@comet/cms-api";
import { BaseEntity, Entity, Enum, ManyToOne, OptionalProps, PrimaryKey, Property, Ref } from "@mikro-orm/postgresql";
import { Field, Float, ID, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { v4 as uuid } from "uuid";

import { Product } from "./product.entity";

export enum VariantStatus {
    Active = "Active",
    OutOfStock = "OutOfStock",
    Discontinued = "Discontinued",
}

registerEnumType(VariantStatus, { name: "VariantStatus" });

@Entity()
@ObjectType()
@RootBlockEntity()
@ScopedEntity((productVariant) => ({
    domain: productVariant.product.getEntity().domain,
    language: productVariant.product.getEntity().language,
}))
export class ProductVariant extends BaseEntity {
    [OptionalProps]?: "createdAt" | "updatedAt" | "stock" | "isAvailable" | "variantStatus";

    @PrimaryKey({ type: "uuid" })
    @Field(() => ID)
    id: string = uuid();

    @Property({ type: "text" })
    @Field()
    name: string;

    @Property({ type: "text" })
    @Field()
    sku: string;

    @Property({ type: "float" })
    @Field(() => Float)
    price: number;

    @Property({ type: "integer" })
    @Field(() => Int)
    stock: number = 0;

    @Property({ type: "boolean" })
    @Field()
    isAvailable: boolean = true;

    @Enum({ items: () => VariantStatus })
    @Field(() => VariantStatus)
    variantStatus: VariantStatus = VariantStatus.Active;

    @ManyToOne(() => Product, { ref: true })
    @Field(() => Product)
    product: Ref<Product>;

    @RootBlock(DamImageBlock)
    @Property({ type: new RootBlockType(DamImageBlock), nullable: true })
    @Field(() => RootBlockDataScalar(DamImageBlock), { nullable: true })
    image?: BlockDataInterface;

    @Property({ type: "timestamp with time zone" })
    @Field()
    createdAt: Date = new Date();

    @Property({ type: "timestamp with time zone", onUpdate: () => new Date() })
    @Field()
    updatedAt: Date = new Date();
}
