import { Migration } from '@mikro-orm/migrations';

export class Migration20260316065244 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "Product" add column "category" uuid null;`);
    this.addSql(`alter table "Product" add constraint "Product_category_foreign" foreign key ("category") references "ProductCategory" ("id") on update cascade on delete set null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "Product" drop constraint "Product_category_foreign";`);
    this.addSql(`alter table "Product" drop column "category";`);
  }

}
