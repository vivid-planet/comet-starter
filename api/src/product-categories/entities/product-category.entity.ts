import { ScopedEntity } from "@comet/cms-api";
import { BaseEntity, Entity, ManyToOne, OptionalProps, PrimaryKey, Property, Ref } from "@mikro-orm/postgresql";
import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { v4 as uuid } from "uuid";

@Entity()
@ObjectType()
@ScopedEntity((productCategory) => ({
    domain: productCategory.domain,
    language: productCategory.language,
}))
export class ProductCategory extends BaseEntity {
    [OptionalProps]?: "createdAt" | "updatedAt" | "position";

    @PrimaryKey({ type: "uuid" })
    @Field(() => ID)
    id: string = uuid();

    @Property({ type: "text" })
    @Field()
    name: string;

    @Property({ type: "text" })
    @Field()
    slug: string;

    @Property({ type: "integer" })
    @Field(() => Int)
    position: number = 0;

    @ManyToOne(() => ProductCategory, { ref: true, nullable: true })
    @Field(() => ProductCategory, { nullable: true })
    parentCategory?: Ref<ProductCategory>;

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
