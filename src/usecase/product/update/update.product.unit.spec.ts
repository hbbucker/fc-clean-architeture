import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product Test", 9.99);

const input = {
    id: product.id,
    name: "Product 2 Test",
    price: product.price,
};

const output_mock= {
  id: product.id,
  name: "Product 2 Test",
  price: product.price,
};

const MockRepository = () => {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn().mockReturnValue(Promise.resolve(output_mock)),
    };
  };

describe('Unit test for product update use case', () => {

    it('should update a product', async () => {
        const productRepository = MockRepository();
        const updateProduct = new UpdateProductUseCase(productRepository);

        const output = await updateProduct.execute(input);

        expect(output).toEqual(input);
    });
});  