import { faker } from "@faker-js/faker";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Customer } from "@src/customer/entities/customer.entity";
import { mapLimit } from "async";
import { SingleBar } from "cli-progress";

interface CustomersProducts {
    repository: EntityRepository<Customer>;
    bar: SingleBar;
    total: number;
}

export const generateCustomers = async ({ repository, bar, total }: CustomersProducts): Promise<Customer[]> => {
    const generateRandomCustomer = async (): Promise<Customer> => {
        const customer = repository.create({
            id: faker.string.uuid(),
            firstname: faker.person.firstName(),
            lastname: faker.person.lastName(),
        });

        bar.increment(1, {
            title: "Customer",
        });

        return customer;
    };

    return mapLimit<number, Customer>(Array(total), 100, async () => generateRandomCustomer());
};
