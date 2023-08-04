// Scaffolded by the CRUD generator on 2023-03-20.
import { filtersToMikroOrmQuery, searchToMikroOrmQuery } from "@comet/cms-api";
import { ObjectQuery } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

import { ProductFilter } from "./dto/product.filter";
import { Product } from "./entities/product.entity";

@Injectable()
export class ProductsService {
    getFindCondition(options: { search?: string; filter?: ProductFilter }): ObjectQuery<Product> {
        const andFilters = [];

        if (options.search) {
            andFilters.push(searchToMikroOrmQuery(options.search, ["name", "description"]));
        }

        if (options.filter) {
            andFilters.push(filtersToMikroOrmQuery(options.filter));
        }

        return andFilters.length > 0 ? { $and: andFilters } : {};
    }
}
