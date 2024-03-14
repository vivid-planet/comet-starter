import { faker } from "@faker-js/faker";
import { EntityRepository } from "@mikro-orm/postgresql";
import { staticUsers } from "@src/auth/static-users";
import { Product } from "@src/products/entities/product.entity";
import { mapLimit } from "async";
import { SingleBar } from "cli-progress";

interface GenerateProducts {
    repository: EntityRepository<Product>;
    bar: SingleBar;
    total: number;
}

export const generateProducts = async ({ repository, bar, total }: GenerateProducts): Promise<Product[]> => {
    const generateRandomProduct = async (): Promise<Product> => {
        const product = repository.create({
            name: faker.lorem.word(),
            description: faker.lorem.words(),
            creatorId: staticUsers.vividPlanetEmployee.id,
        });
        repository.persist(product);

        bar.increment(1, {
            title: "Product",
        });

        return product;
    };

    return mapLimit<number, Product>(Array(total), 100, async () => generateRandomProduct());
};
