import { ScopedEntity } from "@comet/cms-api";
import { BaseEntity, Collection, Entity, Enum, ManyToMany, OptionalProps, PrimaryKey, Property } from "@mikro-orm/postgresql";
import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { Product } from "@src/products/entities/product.entity";
import { v4 as uuid } from "uuid";

export enum CollectionType {
    Manual = "Manual",
    Seasonal = "Seasonal",
    Featured = "Featured",
    Sale = "Sale",
}

registerEnumType(CollectionType, { name: "CollectionType" });

@Entity()
@ObjectType()
@ScopedEntity((productCollection) => ({
    domain: productCollection.domain,
    language: productCollection.language,
}))
export class ProductCollection extends BaseEntity {
    [OptionalProps]?: "createdAt" | "updatedAt" | "isActive";

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

    @Property({ type: "timestamp with time zone", nullable: true })
    @Field({ nullable: true })
    validFrom?: Date;

    @Property({ type: "timestamp with time zone", nullable: true })
    @Field({ nullable: true })
    validTo?: Date;

    @Property({ type: "boolean" })
    @Field()
    isActive: boolean = false;

    @Enum({ items: () => CollectionType })
    @Field(() => CollectionType)
    collectionType: CollectionType;

    @ManyToMany(() => Product)
    @Field(() => [Product])
    products = new Collection<Product>(this);

    @Property({ type: "text" })
    @Field()
    domain: string;

    @Property({ type: "text" })
    @Field()
    language: string;

    @Property({ type: "timestamp with time zone" })
    @Field()
    createdAt: Date = new Date();

    @Property({ type: "timestamp with time zone", onUpdate: () => new Date() })
    @Field()
    updatedAt: Date = new Date();
}
