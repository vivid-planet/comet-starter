import { Test, TestingModule } from "@nestjs/testing";
import { CurrentUser } from "@src/auth/current-user";

import { Product } from "./entities/product.entity";
import { ProductsAclService } from "./products.acl.service";

describe("ProductsAclService", () => {
    let service: ProductsAclService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsAclService],
        }).compile();

        service = module.get<ProductsAclService>(ProductsAclService);
    });

    it("creator should be able to delete product", () => {
        expect(
            service.isEditingAllowed(
                { creatorId: "863ba9f6-813c-4d62-9019-bb9da4ddac5d" } as Product,
                { id: "863ba9f6-813c-4d62-9019-bb9da4ddac5d" } as CurrentUser,
            ),
        ).toBe(true);
    });

    it("other users must not be able to delete product", () => {
        expect(
            service.isEditingAllowed(
                { creatorId: "863ba9f6-813c-4d62-9019-bb9da4ddac5d" } as Product,
                { id: "4a2cad57-a8af-4fec-ad7a-0ff20582cb87" } as CurrentUser,
            ),
        ).toBe(false);
    });
});
