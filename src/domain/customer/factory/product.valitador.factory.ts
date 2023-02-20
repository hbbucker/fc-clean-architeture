import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../../product/entity/product";
import ProductYpuValidator from "../validator/product.ypu.validator";

export default class ProductValidatorFactory {
    static create(): ValidatorInterface<Product> {
        return new ProductYpuValidator();
    }
}