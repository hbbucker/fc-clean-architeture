import { toXML } from "jstoxml";
import { OutputListProductDto } from "../../../usecase/product/list/list.product.dto";

export default class ProductPresenter {
    static listXML(data: OutputListProductDto): string {
        const xmlOption = {
            header: true,
            ident: " ",
            newline: "\n",
            allowEmpty: true,
        };

        return toXML (
            {
                products: [
                    data.products.map((p) => ({
                        product: {
                            id: p.id,
                            name: p.name,
                            price: p.price,
                        }
                    }))
                ]                
            }, xmlOption);
    }
}