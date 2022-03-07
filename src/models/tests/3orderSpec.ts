import { OrderData } from "../order";

const orders = new OrderData();

describe("Order model", () => {
  it("should have a create method", () => {
    expect(orders.create).toBeDefined();
  });
  it("should have a show method", () => {
    expect(orders.show).toBeDefined();
  });
  it("should create a new order", async () => {
    const result = await orders.create({
      id: 1,
      user_id: "1",
      status: "active",
    });
    expect(result).toEqual({
      id: 1,
      user_id: "1",
      status: "active",
    });
  });
  it("should add product to order", async () => {
    const result = await orders.addProduct({
      quantity: 20,
      order_id: "1",
      product_id: "1",
    });
    expect(result).toEqual({
      id: 1,
      quantity: 20,
      order_id: "1",
      product_id: "1",
    });
  });
  it("should show user's order", async () => {
    const result = await orders.show(1);
    expect(result).toEqual([
      {
        quantity: 20,
        order_id: "1",
        product_id: "1",
        user_id: "1",
        status: "active",
      },
    ]);
  });
});
