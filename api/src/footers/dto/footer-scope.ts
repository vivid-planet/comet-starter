import { Embeddable, Property } from "@mikro-orm/core";
import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@Embeddable()
@ObjectType()
@InputType("FooterScopeInput")
export class FooterScope {
    @Property({ type: "text" })
    @Field()
    @IsString()
    domain: string;

    @Property({ type: "text" })
    @Field()
    @IsString()
    language: string;
}
