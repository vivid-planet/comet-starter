import { Migration } from "@mikro-orm/migrations";

export class Migration20241204114353 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "Footer" ("id" uuid not null, "content" json not null, "scope_domain" text not null, "scope_language" text not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "Footer_pkey" primary key ("id"));',
        );

        this.addSql(
            'create table "Link" ("id" uuid not null, "content" json not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "Link_pkey" primary key ("id"));',
        );

        this.addSql(
            'create table "Page" ("id" uuid not null, "content" json not null, "seo" json not null, "stage" json not null, "createdAt" timestamptz not null, "updatedAt" timestamptz not null, constraint "Page_pkey" primary key ("id"));',
        );

        this.addSql(
            'alter table "PageTreeNode" add column "scope_domain" text not null, add column "scope_language" text not null, add column "category" text check ("category" in (\'mainNavigation\')) not null default \'mainNavigation\';',
        );
        this.addSql(
            'alter table "PageTreeNode" add constraint "PageTreeNode_parentId_foreign" foreign key ("parentId") references "PageTreeNode" ("id") on update cascade on delete set null;',
        );
        this.addSql('create index "PageTreeNode_parentId_index" on "PageTreeNode" ("parentId");');

        this.addSql('alter table "Redirect" add column "scope_domain" text not null;');
    }
}
