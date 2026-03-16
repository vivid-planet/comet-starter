import { Migration } from '@mikro-orm/migrations';

export class Migration20260316063858 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "ProductCategory" ("id" uuid not null, "name" text not null, "slug" text not null, "position" int not null default 0, "parentCategory" uuid null, "domain" text not null, "language" text not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "ProductCategory_pkey" primary key ("id"));`);

    this.addSql(`alter table "ProductCategory" add constraint "ProductCategory_parentCategory_foreign" foreign key ("parentCategory") references "ProductCategory" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "ProductCategory" cascade;`);
  }

}
