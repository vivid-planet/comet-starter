import { MikroORM, UseRequestContext } from "@mikro-orm/core";
import { Injectable, Logger } from "@nestjs/common";
import { Command, Console } from "nestjs-console";

@Injectable()
@Console()
export class ProductsConsole {
    private readonly logger = new Logger(ProductsConsole.name);

    constructor(
        private readonly orm: MikroORM, // MikroORM is injected so we can use the request context
    ) {}

    @Command({
        command: "demo-command",
        description: "Demo-Command for cronjob-deployment",
    })
    @UseRequestContext()
    async demoCommand(): Promise<void> {
        this.logger.log("Execute demo-command.");
    }
}
