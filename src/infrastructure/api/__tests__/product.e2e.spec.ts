import request from "supertest";
import { app, sequelize } from "../express";


describe("E2E teste for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force:  true });
    })

    afterAll(async () => {
        await sequelize.close(); 
    });

    it('should create a product', async () => {
        
        const response = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product Test",
                price: 9.99,
            });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Product Test")
        expect(response.body.price).toBe(9.99)
    });

    it('should list all products', async () => {

        await createProdutsForTest();

        const response = await request(app)
                            .get("/product")
                            .send({});

        expect(response.status).toBe(200);                                    
        expect(response.body.products.length).toBe(2);

        const prod1 = response.body.products[0];
        expect(prod1.name).toBe("Product Test");
        expect(prod1.price).toBe(9.99);

        const prod2 = response.body.products[1];
        expect(prod2.name).toBe("Product Test 2");
        expect(prod2.price).toBe(8.88);
    });

    it('should list all products xml', async () => {

        await createProdutsForTest();

        const response = await request(app)
                            .get("/product")
                            .set("Accept", "application/xml")
                            .send({});

        expect(response.status).toBe(200);                                    
        expect(response.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(response.text).toContain(`<products>`);
        expect(response.text).toContain(`<product>`);
        expect(response.text).toContain(`<name>Product Test</name>`);
        expect(response.text).toContain(`<price>9.99</price>`);
        expect(response.text).toContain(`<name>Product Test 2</name>`);
        expect(response.text).toContain(`<price>8.88</price>`);
        expect(response.text).toContain(`</products>`);
        expect(response.text).toContain(`</product>`);
    });
});

async function createProdutsForTest(){
    const createProd1 = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product Test",
                price: 9.99,
            });
        
        expect(createProd1.status).toBe(200);

        const createProd2 = await request(app)
            .post("/product")
            .send({
                type: "a",
                name: "Product Test 2",
                price: 8.88,
            });
        
        expect(createProd2.status).toBe(200);
}