import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ObjectType()
@InputType("ProductCategoryScopeInput")
export class ProductCategoryScope {
    @Field()
    @IsString()
    domain: string;

    @Field()
    @IsString()
    language: string;
}
