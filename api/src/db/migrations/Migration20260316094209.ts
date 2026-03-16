import { Migration } from '@mikro-orm/migrations';

export class Migration20260316094209 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "ProductReview" ("id" uuid not null, "title" text not null, "body" text not null, "rating" text check ("rating" in ('One', 'Two', 'Three', 'Four', 'Five')) not null, "reviewerName" text not null, "reviewedAt" timestamptz not null, "isApproved" boolean not null default false, "product" uuid not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "ProductReview_pkey" primary key ("id"));`);

    this.addSql(`alter table "ProductReview" add constraint "ProductReview_product_foreign" foreign key ("product") references "Product" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "ProductReview" cascade;`);
  }

}
