import { ExtractBlockData, RootBlock, RootBlockEntity } from "@comet/blocks-api";
import { CrudSingleGenerator, DocumentInterface, RootBlockDataScalar, RootBlockType } from "@comet/cms-api";
import { BaseEntity, Embedded, Entity, OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { FooterContentBlock } from "@src/footers/blocks/footer-content.block";
import { FooterContentScope } from "@src/footers/dto/footer-content-scope";
import { v4 } from "uuid";

@Entity()
@ObjectType({
    implements: () => [DocumentInterface],
})
@RootBlockEntity()
@CrudSingleGenerator({ targetDirectory: `${__dirname}/../generated/` })
export class Footer extends BaseEntity<Footer, "id"> implements DocumentInterface {
    [OptionalProps]?: "createdAt" | "updatedAt";

    @PrimaryKey({ columnType: "uuid" })
    @Field(() => ID)
    id: string = v4();

    @RootBlock(FooterContentBlock)
    @Property({ customType: new RootBlockType(FooterContentBlock) })
    @Field(() => RootBlockDataScalar(FooterContentBlock))
    content: ExtractBlockData<typeof FooterContentBlock>;

    @Embedded(() => FooterContentScope)
    @Field(() => FooterContentScope)
    scope: FooterContentScope;

    @Property({ columnType: "timestamp with time zone" })
    @Field()
    createdAt: Date = new Date();

    @Property({ columnType: "timestamp with time zone", onUpdate: () => new Date() })
    @Field()
    updatedAt: Date = new Date();
}
