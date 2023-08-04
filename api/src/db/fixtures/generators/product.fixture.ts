import { EntityRepository } from "@mikro-orm/postgresql";
import { Product } from "@src/products/entities/product.entity";
import { mapLimit } from "async";
import { SingleBar } from "cli-progress";
import * as faker from "faker";

interface GenerateProducts {
    repository: EntityRepository<Product>;
    bar: SingleBar;
    total: number;
}

export const generateProducts = async ({ repository, bar, total }: GenerateProducts): Promise<Product[]> => {
    const generateRandomProduct = async (): Promise<Product> => {
        const product = repository.create({ name: faker.random.word(), description: faker.random.words(), creatorId: faker.datatype.uuid() });
        repository.persist(product);

        bar.increment(1, {
            title: "Product",
        });

        return product;
    };

    return mapLimit<number, Product>(Array(total), 100, async () => generateRandomProduct());
};
