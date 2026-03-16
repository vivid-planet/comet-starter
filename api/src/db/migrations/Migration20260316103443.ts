import { Migration } from '@mikro-orm/migrations';

export class Migration20260316103443 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "ProductCollection" ("id" uuid not null, "name" text not null, "slug" text not null, "description" text null, "validFrom" timestamptz null, "validTo" timestamptz null, "isActive" boolean not null default false, "collectionType" text check ("collectionType" in ('Manual', 'Seasonal', 'Featured', 'Sale')) not null, "domain" text not null, "language" text not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "ProductCollection_pkey" primary key ("id"));`);

    this.addSql(`create table "ProductCollection_products" ("productCollection" uuid not null, "product" uuid not null, constraint "ProductCollection_products_pkey" primary key ("productCollection", "product"));`);

    this.addSql(`alter table "ProductCollection_products" add constraint "ProductCollection_products_productCollection_foreign" foreign key ("productCollection") references "ProductCollection" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "ProductCollection_products" add constraint "ProductCollection_products_product_foreign" foreign key ("product") references "Product" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "ProductCollection_products" cascade;`);
    this.addSql(`drop table if exists "ProductCollection" cascade;`);
  }

}
