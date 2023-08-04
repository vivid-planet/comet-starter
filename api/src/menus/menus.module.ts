import { Module } from "@nestjs/common";

import { MenusResolver } from "./menus.resolver";

@Module({
    providers: [MenusResolver],
})
export class MenusModule {}
