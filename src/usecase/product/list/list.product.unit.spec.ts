import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";


const product1 = ProductFactory.create("a", "Product 1", 9.99);
const product2 = ProductFactory.create("a", "Product 2", 5.55);

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    };
};

describe('Unit test for listing product use case', () => {

    it('should lista a products', async () => {
        const productRepository = MockRepository();
        const listProduct = new ListProductUseCase(productRepository);

        const output = await listProduct.execute({});

        expect(output.products.length).toBe(2);

        expect(output.products[0].id).toEqual(product1.id)
        expect(output.products[0].name).toEqual(product1.name)
        expect(output.products[0].price).toEqual(product1.price)

        expect(output.products[1].id).toEqual(product2.id)
        expect(output.products[1].name).toEqual(product2.name)
        expect(output.products[1].price).toEqual(product2.price)

    });
});