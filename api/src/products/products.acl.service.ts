import { Injectable } from "@nestjs/common";
import { CurrentUser } from "@src/auth/current-user";

import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsAclService {
    isEditingAllowed(product: Product, user: CurrentUser): boolean {
        if (product.creatorId === user.id) {
            return true;
        }

        return false;
    }
}
