import { Migration } from "@mikro-orm/migrations";

export class Migration20260313144308 extends Migration {
    override async up(): Promise<void> {
        this.addSql(`create table if not exists "Product" ("id" uuid not null, "name" text not null, "slug" text not null, "description" text null, "price" real not null, "sku" text not null, "publishedAt" timestamptz null, "isPublished" boolean not null default false, "productStatus" text check ("productStatus" in ('Draft', 'InReview', 'Published', 'Archived')) not null default 'Draft', "productType" text check ("productType" in ('Physical', 'Digital', 'Subscription')) not null, "mainImage" json null, "domain" text not null, "language" text not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "Product_pkey" primary key ("id"));`);
        this.addSql(`alter table "Product" alter column "price" type real using ("price"::real);`);
    }

    override async down(): Promise<void> {
        this.addSql(`drop table if exists "Product" cascade;`);
    }
}
