import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
   test("Should display validation errors", async () => {
      const res = await request(server).post("/api/products").send({});
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors).toHaveLength(4);

      expect(res.status).not.toBe(404);
      expect(res.body.errors).not.toHaveLength(2);
   });
   test("Should validate that the price is higher than 0", async () => {
      const res = await request(server).post("/api/products").send({
         name: "Monitor Test",
         price: 0,
      });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors).toHaveLength(1);

      expect(res.status).not.toBe(404);
      expect(res.body.errors).not.toHaveLength(2);
   });
   test("Should create a new product", async () => {
      const res = await request(server).post("/api/products").send({
         name: "Mouse Test",
         price: 50,
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("data");
   });
});

describe("GET /api/products", () => {
   test("Should check that url /api/products exists", async () => {
      const res = await request(server).get("/api/products");
      expect(res.status).not.toBe(404);
   });
   test("Should GET a json response with all the products", async () => {
      const res = await request(server).get("/api/products");

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
      expect(res.headers["content-type"]).toMatch(/json/);

      expect(res.body).not.toHaveProperty("errors");
   });
});

describe("GET /api/products/:id", () => {
   test("Should return a 404 status if product doesnt exist", async () => {
      const productId = 2000;
      const res = await request(server).get(`/api/products/${productId}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe("Product not found");
   });
   test("Should check if productId is valid", async () => {
      const res = await request(server).get("/api/products/not-valid-url");
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
   });
   test("Should return a json response with the product", async () => {
      const res = await request(server).get(`/api/products/1`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("data");
   });
});

describe("PUT /api/products/:id", () => {
   test("Should display validation error messages when updating a product", async () => {
      const res = await request(server).put("/api/products/1").send({});

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors).toBeTruthy();
      expect(res.body.errors).toHaveLength(5);

      expect(res.status).not.toBe(200);
   });

   test("Should validate that the price is higher than 0", async () => {
      const res = await request(server).put("/api/products/1").send({
         name: "Monitor",
         price: -300,
         availability: true,
      });

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors).toBeTruthy();
      expect(res.body.errors).toHaveLength(1);

      expect(res.status).not.toBe(200);
   });
});

describe("DELETE /api/products/:id", () => {
   test("Should check a valid ID", async () => {
      const res = await request(server).delete("/api/products/id-not-valid")

      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('errors')
      expect(res.body.errors[0].msg).toBe('Id not valid')
   })
   test("Should return a 404 status if product doesnt exist", async () => {
      const productId = 2000;
      const res = await request(server).get(`/api/products/${productId}`);
      expect(res.status).toBe(404);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe("Product not found");
   });
   test("Should delete a product", async () => {
      const res = await request(server).delete("/api/products/1")
      expect(res.status).toBe(200)
      expect(res.body.message).toBe("Product successfully deleted")
   })
})
