import { CrudField, CrudGenerator } from "@comet/cms-api";
import { BaseEntity, Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { v4 } from "uuid";

@Entity()
@ObjectType()
@CrudGenerator({ targetDirectory: `${__dirname}/../generated/`, requiredPermission: "customer" })
export class Customer extends BaseEntity<Customer, "id"> {
    @CrudField({ search: true, filter: true, sort: true, input: false })
    @Field(() => ID)
    @PrimaryKey({ columnType: "uuid" })
    id: string = v4();

    @CrudField({ search: true, filter: false, sort: false, input: true })
    @Field()
    @Property({ columnType: "text" })
    firstname: string;

    @CrudField({ search: true, filter: false, sort: false, input: true })
    @Field()
    @Property({ columnType: "text" })
    lastname: string;

    @CrudField({ search: false, filter: false, sort: false, input: false })
    @Property({ onUpdate: () => new Date() })
    @Field()
    updatedAt?: Date = new Date();
}
