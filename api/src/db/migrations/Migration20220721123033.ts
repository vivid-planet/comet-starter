import { Migration } from "@mikro-orm/migrations";

export class Migration20220721123033 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "Product" ("id" uuid not null, "creatorId" uuid not null, "name" text not null, "description" text not null, "createdAt" timestamp with time zone not null, "updatedAt" timestamp with time zone not null);',
        );
        this.addSql('alter table "Product" add constraint "Product_pkey" primary key ("id");');
    }
}
