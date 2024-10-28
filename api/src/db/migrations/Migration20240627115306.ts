import { Migration } from "@mikro-orm/migrations";

export class Migration20240627115306 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "Footer" ("id" uuid not null, "content" json not null, "scope_domain" text not null, "scope_language" text not null, "createdAt" timestamp with time zone not null, "updatedAt" timestamp with time zone not null, constraint "Footer_pkey" primary key ("id"));',
        );
    }
}
