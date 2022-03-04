import { ProductsData } from "../product";

const products = new ProductsData();

describe("Product Model", () => {
  it("should have an index method", () => {
    expect(products.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(products.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(products.create).toBeDefined();
  });
  it("should create a new product", async () => {
    const result = await products.create({
      id: 1,
      name: "productName",
      price: 20,
    });
    expect(result).toEqual({
      id: 1,
      name: "productName",
      price: 20,
    });
  });
  it("should list all products", async () => {
    const result = await products.index();
    expect(result).toEqual([
      {
        id: 1,
        name: "productName",
        price: 20,
      },
    ]);
  });
  it("should show specific product", async () => {
    const result = await products.show(1);
    expect(result).toEqual({
      id: 1,
      name: "productName",
      price: 20,
    });
  });
});
