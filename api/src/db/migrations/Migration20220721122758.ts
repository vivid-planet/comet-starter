import { Migration } from "@mikro-orm/migrations";

export class Migration20220721122758 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "Page" ("id" uuid not null, "content" json not null, "stage" json not null, "seo" json not null, "createdAt" timestamp with time zone not null, "updatedAt" timestamp with time zone not null);',
        );
        this.addSql('alter table "Page" add constraint "Page_pkey" primary key ("id");');

        this.addSql(
            'create table "Link" ("id" uuid not null, "content" json not null, "createdAt" timestamp with time zone not null, "updatedAt" timestamp with time zone not null);',
        );
        this.addSql('alter table "Link" add constraint "Link_pkey" primary key ("id");');

        this.addSql(
            'alter table "PageTreeNode" add column "scope_domain" text not null, add column "scope_language" text not null, add column "category" text check ("category" in (\'MainNavigation\')) not null default \'MainNavigation\';',
        );
        this.addSql(
            'alter table "PageTreeNode" add constraint "PageTreeNode_parentId_foreign" foreign key ("parentId") references "PageTreeNode" ("id") on update cascade on delete set null;',
        );
        this.addSql('create index "PageTreeNode_parentId_index" on "PageTreeNode" ("parentId");');

        this.addSql('alter table "Redirect" add column "scope_domain" text not null;');
    }
}
