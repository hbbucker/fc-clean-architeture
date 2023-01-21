import { Sequelize } from "sequelize-typescript";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputCreateProductDto, OutputCreateProductDto } from "../create/create.product.dto";
import CreateProductUseCase from "../create/create.product.usecase";
import { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe('Teste integration update product usa case', () => {

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

    it('should update a product', async () => {
        const repository = new ProductRepository();
        const usecase = new UpdateProductUseCase(repository);

        const product = await createProduct(repository);

        let input: InputUpdateProductDto;
        input = {
            id: product.id,
            name: product.name + " changed",
            price: 4.99,
        }

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
    });

    it('should update a product when not exists', async () => {
        const repository = new ProductRepository();
        const usecase = new UpdateProductUseCase(repository);

        let input: InputUpdateProductDto;
        input = {
            id: "123",
            name: "Product changed",
            price: 4.99,
        }

        await expect(usecase.execute(input))
            .rejects.toThrow("Product not found");
    });

});

async function createProduct(repository: ProductRepositoryInterface): Promise<OutputCreateProductDto> {
    const createProduct = new CreateProductUseCase(repository);

    let input: InputCreateProductDto;

    input = {
        type: "a",
        name: "Product Test 1",
        price: 9.99,
    }

    return await createProduct.execute(input);
}