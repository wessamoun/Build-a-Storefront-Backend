// Supertest to test the status of responses from servers.
import supertest from "supertest";
import app from "../../server";

const request = supertest(app);
describe("Test server (product) endpoint responses", () => {
  it("gets create endpoint", async () => {
    const response = await request.post("/users/products");
    expect(response.status).toBe(200);
  });
  it("gets index endpoint", async () => {
    const response = await request.get("/products");
    expect(response.status).toBe(200);
  });
  it("gets show endpoint", async () => {
    const response = await request.get("/products/1");
    expect(response.status).toBe(200);
  });
});
