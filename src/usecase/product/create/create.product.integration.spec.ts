import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductDto } from "../find/find.product.dto";
import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";

import { validate as uuidValidate, version as uuidVersion } from "uuid";

describe('Test integration create product use case', () => {

    let sequelize: Sequelize;
    let input: InputCreateProductDto;
    let findInput: InputFindProductDto;

    beforeEach(async () => {
        input = {
            type: "a",
            name: "Product Test",
            price: 9.99,
        }

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

    it("should create a product", async () => {
        const repository = new ProductRepository();
        const usecase = new CreateProductUseCase(repository);

        const output = await usecase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price,
        });

        expect(uuidValidate(output.id)).toEqual(true);
        expect(uuidVersion(output.id)).toEqual(4)
    });
});