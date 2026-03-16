import { BaseEntity, Entity, Enum, ManyToOne, OptionalProps, PrimaryKey, Property, Ref } from "@mikro-orm/postgresql";
import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { v4 as uuid } from "uuid";

import { Product } from "./product.entity";

export enum Rating {
    One = "One",
    Two = "Two",
    Three = "Three",
    Four = "Four",
    Five = "Five",
}

registerEnumType(Rating, { name: "Rating" });

@Entity()
@ObjectType()
export class ProductReview extends BaseEntity {
    [OptionalProps]?: "createdAt" | "updatedAt" | "isApproved";

    @PrimaryKey({ type: "uuid" })
    @Field(() => ID)
    id: string = uuid();

    @Property({ type: "text" })
    @Field()
    title: string;

    @Property({ type: "text" })
    @Field()
    body: string;

    @Enum({ items: () => Rating })
    @Field(() => Rating)
    rating: Rating;

    @Property({ type: "text" })
    @Field()
    reviewerName: string;

    @Property({ type: "timestamp with time zone" })
    @Field()
    reviewedAt: Date;

    @Property({ type: "boolean" })
    @Field()
    isApproved: boolean = false;

    @ManyToOne(() => Product, { ref: true })
    @Field(() => Product)
    product: Ref<Product>;

    @Property({ type: "timestamp with time zone" })
    @Field()
    createdAt: Date = new Date();

    @Property({ type: "timestamp with time zone", onUpdate: () => new Date() })
    @Field()
    updatedAt: Date = new Date();
}
