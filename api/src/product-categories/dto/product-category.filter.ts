import { DateTimeFilter, IdFilter, ManyToOneFilter, NumberFilter, StringFilter } from "@comet/cms-api";
import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsOptional, ValidateNested } from "class-validator";

@InputType()
export class ProductCategoryFilter {
    @Field(() => IdFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => IdFilter)
    id?: IdFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    name?: StringFilter;

    @Field(() => StringFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => StringFilter)
    slug?: StringFilter;

    @Field(() => NumberFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => NumberFilter)
    position?: NumberFilter;

    @Field(() => ManyToOneFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => ManyToOneFilter)
    parentCategory?: ManyToOneFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateTimeFilter)
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, { nullable: true })
    @ValidateNested()
    @IsOptional()
    @Type(() => DateTimeFilter)
    updatedAt?: DateTimeFilter;

    @Field(() => [ProductCategoryFilter], { nullable: true })
    @Type(() => ProductCategoryFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    and?: ProductCategoryFilter[];

    @Field(() => [ProductCategoryFilter], { nullable: true })
    @Type(() => ProductCategoryFilter)
    @ValidateNested({ each: true })
    @IsOptional()
    or?: ProductCategoryFilter[];
}
