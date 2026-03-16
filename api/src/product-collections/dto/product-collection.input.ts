import { IsSlug, PartialType } from "@comet/cms-api";
import { Field, ID, InputType } from "@nestjs/graphql";
import { CollectionType } from "@src/product-collections/entities/product-collection.entity";
import { IsArray, IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

@InputType()
export class ProductCollectionInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    name: string;

    @IsNotEmpty()
    @IsSlug()
    @Field()
    slug: string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    description?: string;

    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    validFrom?: Date;

    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    validTo?: Date;

    @IsNotEmpty()
    @IsBoolean()
    @Field({ defaultValue: false })
    isActive: boolean;

    @IsNotEmpty()
    @IsEnum(CollectionType)
    @Field(() => CollectionType)
    collectionType: CollectionType;

    @Field(() => [ID], { defaultValue: [] })
    @IsArray()
    @IsUUID(undefined, { each: true })
    products: string[];
}

@InputType()
export class ProductCollectionUpdateInput extends PartialType(ProductCollectionInput) {}
