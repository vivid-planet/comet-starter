import { Migration } from "@mikro-orm/migrations";

export class Migration20250204084547 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table "Customer" ("id" uuid not null, "firstname" text not null, "lastname" text not null, "updatedAt" timestamptz(0) not null, constraint "Customer_pkey" primary key ("id"));',
        );
    }
}
