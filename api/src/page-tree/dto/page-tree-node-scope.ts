import { Embeddable, Property } from "@mikro-orm/core";
import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";

enum Domain {
    main = "main",
    secondary = "secondary",
}

registerEnumType(Domain, { name: "Domain" });

enum Language {
    en = "en",
    de = "de",
}

registerEnumType(Language, { name: "Language" });

@Embeddable()
@ObjectType("PageTreeNodeScope") // name must not be changed in the app
@InputType("PageTreeNodeScopeInput") // name must not be changed in the app
export class PageTreeNodeScope {
    @Property({ columnType: "text" })
    @Field(() => Domain)
    @IsEnum(Domain)
    domain: Domain;

    @Property({ columnType: "text" })
    @Field(() => Language)
    @IsEnum(Language)
    language: Language;
}
