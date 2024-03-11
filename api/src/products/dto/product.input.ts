// Scaffolded by the CRUD generator on 2023-03-20.
import { PartialType } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class ProductInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    description: string;
}

@InputType()
export class ProductUpdateInput extends PartialType(ProductInput) {}
