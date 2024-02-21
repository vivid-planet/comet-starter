import { CurrentUser } from "@comet/cms-api";
import { Injectable } from "@nestjs/common";

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
