import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ObjectType()
@InputType("ProductScopeInput")
export class ProductScope {
    @Field()
    @IsString()
    domain: string;

    @Field()
    @IsString()
    language: string;
}
