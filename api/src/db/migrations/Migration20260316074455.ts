import { Migration } from '@mikro-orm/migrations';

export class Migration20260316074455 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "ProductVariant" ("id" uuid not null, "name" text not null, "sku" text not null, "price" real not null, "stock" int not null default 0, "isAvailable" boolean not null default true, "variantStatus" text check ("variantStatus" in ('Active', 'OutOfStock', 'Discontinued')) not null default 'Active', "product" uuid not null, "image" json null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "ProductVariant_pkey" primary key ("id"));`);

    this.addSql(`alter table "ProductVariant" add constraint "ProductVariant_product_foreign" foreign key ("product") references "Product" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "ProductVariant" cascade;`);
  }

}
