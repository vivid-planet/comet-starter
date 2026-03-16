import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@ObjectType()
@InputType("ProductCollectionScopeInput")
export class ProductCollectionScope {
    @Field()
    @IsString()
    domain: string;

    @Field()
    @IsString()
    language: string;
}
