import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("123", "Product Test", 9.59);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe('Unit Test find product use case', () => {

    it("should find a product", async () => {
        const productRepository = MockRepository();
        const findProduct = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        };

        const output = {
            id: "123",
            name: "Product Test",
            price: 9.59,
        };

        const result = await findProduct.execute(input);

        expect(result).toEqual(output);

    });

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const findProduct = new FindProductUseCase(productRepository);

        const input = {
            id: "123"
        };

        await expect(findProduct.execute(input)).rejects.toThrow(
            "Product not found"
        );

    });
});