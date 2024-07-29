import { Migration } from "@mikro-orm/migrations";

export class Migration20240729171532 extends Migration {
    async up(): Promise<void> {
        this.addSql('alter table "Redirect" add column "scope_domain" text not null;');
    }
}
