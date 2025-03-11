import {
    BlockDataInterface,
    CrudSingleGenerator,
    DocumentInterface,
    RootBlock,
    RootBlockDataScalar,
    RootBlockEntity,
    RootBlockType,
} from "@comet/cms-api";
import { BaseEntity, Embedded, Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/postgresql";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { FooterContentBlock } from "@src/footers/blocks/footer-content.block";
import { FooterScope } from "@src/footers/dto/footer-scope";
import { v4 } from "uuid";

@Entity()
@ObjectType({
    implements: () => [DocumentInterface],
})
@RootBlockEntity()
@CrudSingleGenerator({ targetDirectory: `${__dirname}/../generated/`, requiredPermission: "pageTree" })
export class Footer extends BaseEntity implements DocumentInterface {
    [OptionalProps]?: "createdAt" | "updatedAt";

    @PrimaryKey({ type: "uuid" })
    @Field(() => ID)
    id: string = v4();

    @RootBlock(FooterContentBlock)
    @Property({ type: new RootBlockType(FooterContentBlock) })
    @Field(() => RootBlockDataScalar(FooterContentBlock))
    content: BlockDataInterface;

    @Embedded(() => FooterScope)
    @Field(() => FooterScope)
    scope: FooterScope;

    @Property({ type: "timestamp with time zone" })
    @Field()
    createdAt: Date = new Date();

    @Property({ type: "timestamp with time zone", onUpdate: () => new Date() })
    @Field()
    updatedAt: Date = new Date();
}
