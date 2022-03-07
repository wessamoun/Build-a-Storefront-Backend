// Supertest to test the status of responses from servers.
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);
describe("Test server (order) endpoint responses", () => {
  it("gets create endpoint", async () => {
    const response = await request.post("/users/1/orders");
    expect(response.status).toBe(200);
  });
  it("gets show endpoint", async () => {
    const response = await request.get("/users/1/orders");
    expect(response.status).toBe(200);
  });
  it("gets addProduct endpoint", async () => {
    const response = await request.post("/users/1/orders/1/products");
    expect(response.status).toBe(200);
  });
});
