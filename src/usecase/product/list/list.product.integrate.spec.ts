import { Sequelize } from "sequelize-typescript";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto } from "../create/create.product.dto";
import CreateProductUseCase from "../create/create.product.usecase";
import ListProductUseCase from "./list.product.usecase";

let input1: InputCreateProductDto;
let input2: InputCreateProductDto;

describe('Test integration list product use case', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it('should lista a products', async () => {
        const repository = new ProductRepository();
        const usecase = new ListProductUseCase(repository);

        await createProducts(repository);

        const output = await usecase.execute({});

        expect(output.products.length).toBe(2);

        expect(output.products[0].id.length).toEqual(36);
        expect(output.products[0].name).toEqual(input1.name);
        expect(output.products[0].price).toEqual(input1.price);

        expect(output.products[1].id.length).toEqual(36);
        expect(output.products[1].name).toEqual(input2.name);
        expect(output.products[1].price).toEqual(input2.price);

    });
});

async function createProducts(repository: ProductRepositoryInterface) {
    const createProduct = new CreateProductUseCase(repository);

    input1 = {
        type: "a",
        name: "Product Test 1",
        price: 9.99,
    }

    input2 = {
        type: "a",
        name: "Product Test 2",
        price: 5.55,
    }

    await createProduct.execute(input1);
    await createProduct.execute(input2);
}