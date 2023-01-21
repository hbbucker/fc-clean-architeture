import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe('Test integration find product use case', () => {

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


    it('should find a product', async () => {
        const repository = new ProductRepository();
        const usecase = new FindProductUseCase(repository);

        const product = new Product("123", "Product Test", 9.99);

        await repository.create(product);

        const input = {
            id: "123"
        }

        const output = {
            id: product.id,
            name: product.name,
            price: product.price,
        }

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it('should not found a product', async () => {
        const repository = new ProductRepository();
        const usecase = new FindProductUseCase(repository);

        const input = {
            id: "123"
        }

        await expect(usecase.execute(input)).rejects.toThrow(
            "Product not found"
        );
    });

});