import { BlockInputInterface, DamImageBlock, isBlockInputInterface, PartialType, RootBlockInputScalar } from "@comet/cms-api";
import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { VariantStatus } from "@src/products/entities/product-variant.entity";
import { Transform } from "class-transformer";
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

@InputType()
export class ProductVariantInput {
    @IsNotEmpty()
    @IsString()
    @Field()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    sku: string;

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Float)
    price: number;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Field(() => Int, { defaultValue: 0 })
    stock: number;

    @IsNotEmpty()
    @IsBoolean()
    @Field({ defaultValue: true })
    isAvailable: boolean;

    @IsNotEmpty()
    @IsEnum(VariantStatus)
    @Field(() => VariantStatus, { defaultValue: VariantStatus.Active })
    variantStatus: VariantStatus;

    @IsOptional()
    @Field(() => RootBlockInputScalar(DamImageBlock), { nullable: true })
    @Transform(({ value }) => (isBlockInputInterface(value) ? value : DamImageBlock.blockInputFactory(value)), { toClassOnly: true })
    @ValidateNested()
    image?: BlockInputInterface;
}

@InputType()
export class ProductVariantUpdateInput extends PartialType(ProductVariantInput) {}
