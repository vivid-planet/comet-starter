import { Migration } from "@mikro-orm/migrations";

export class Migration20250312073439 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "PredefinedPage" ("id" uuid not null, "createdAt" timestamp with time zone not null, "updatedAt" timestamp with time zone not null, "type" text null, constraint "PredefinedPage_pkey" primary key ("id"));',
        );
    }
}
