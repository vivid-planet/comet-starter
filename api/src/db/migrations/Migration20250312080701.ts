import { Migration } from "@mikro-orm/migrations";

export class Migration20250312080701 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "News" ("id" uuid not null, "scope_domain" text not null, "scope_language" text not null, "slug" varchar(255) not null, "title" varchar(255) not null, "status" text check ("status" in (\'Active\', \'Deleted\')) not null default \'Active\', "date" timestamptz(0) not null, "category" text check ("category" in (\'Events\', \'Company\', \'Awards\')) not null, "image" json not null, "content" json not null, "createdAt" timestamp with time zone not null, "updatedAt" timestamp with time zone not null, constraint "News_pkey" primary key ("id"));',
        );

        this.addSql(
            'create table "NewsComment" ("id" uuid not null, "news" uuid not null, "comment" varchar(255) not null, "createdAt" timestamp with time zone not null, "updatedAt" timestamp with time zone not null, constraint "NewsComment_pkey" primary key ("id"));',
        );

        this.addSql(
            'alter table "NewsComment" add constraint "NewsComment_news_foreign" foreign key ("news") references "News" ("id") on update cascade;',
        );
    }
}
