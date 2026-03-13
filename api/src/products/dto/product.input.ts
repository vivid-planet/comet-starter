import { BlockInputInterface, DamImageBlock, isBlockInputInterface, IsSlug, PartialType, RootBlockInputScalar } from "@comet/cms-api";
import { Field, Float, InputType } from "@nestjs/graphql";
import { ProductStatus, ProductType } from "@src/products/entities/product.entity";
import { Transform } from "class-transformer";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

@InputType()
export class ProductInput {
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

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsNotEmpty()
    @IsString()
    @Field()
    sku: string;

    @IsOptional()
    @IsDate()
    @Field({ nullable: true })
    publishedAt?: Date;

    @IsNotEmpty()
    @IsBoolean()
    @Field({ defaultValue: false })
    isPublished: boolean;

    @IsNotEmpty()
    @IsEnum(ProductStatus)
    @Field(() => ProductStatus, { defaultValue: ProductStatus.Draft })
    productStatus: ProductStatus;

    @IsNotEmpty()
    @IsEnum(ProductType)
    @Field(() => ProductType)
    productType: ProductType;

    @IsOptional()
    @Field(() => RootBlockInputScalar(DamImageBlock), { nullable: true })
    @Transform(({ value }) => (isBlockInputInterface(value) ? value : DamImageBlock.blockInputFactory(value)), { toClassOnly: true })
    @ValidateNested()
    mainImage?: BlockInputInterface;
}

@InputType()
export class ProductUpdateInput extends PartialType(ProductInput) {}
