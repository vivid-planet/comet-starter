import { Migration } from "@mikro-orm/migrations";

export class Migration20241203124314 extends Migration {
    async up(): Promise<void> {
        this.addSql('alter table "Footer" alter column "createdAt" type timestamptz(0) using ("createdAt"::timestamptz(0));');
        this.addSql('alter table "Footer" alter column "updatedAt" type timestamptz(0) using ("updatedAt"::timestamptz(0));');

        this.addSql('alter table "Link" alter column "createdAt" type timestamptz(0) using ("createdAt"::timestamptz(0));');
        this.addSql('alter table "Link" alter column "updatedAt" type timestamptz(0) using ("updatedAt"::timestamptz(0));');

        this.addSql('alter table "Page" alter column "createdAt" type timestamptz(0) using ("createdAt"::timestamptz(0));');
        this.addSql('alter table "Page" alter column "updatedAt" type timestamptz(0) using ("updatedAt"::timestamptz(0));');
    }
}
