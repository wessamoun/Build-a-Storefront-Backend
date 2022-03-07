import client from "../database";
export type Order = {
  id?: number;
  user_id: string;
  status: string;
};

export type OrderProducts = {
  id?: number;
  quantity: number;
  order_id: string;
  product_id: string;
};
export type ShowOrder = {
  quantity: number;
  order_id: string;
  product_id: string;
  user_id: string;
  status: string;
};

export class OrderData {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *";
      const result = await conn.query(sql, [o.user_id, o.status]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }
  async addProduct(op: OrderProducts): Promise<OrderProducts> {
    try {
      const sql =
        "INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *";
      const conn = await client.connect();

      const result = await conn.query(sql, [
        op.quantity,
        op.order_id,
        op.product_id,
      ]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${op.product_id} to order ${op.order_id}: ${err}`
      );
    }
  }
  async show(user_id: number): Promise<ShowOrder[]> {
    try {
      const conn = await client.connect();
      const sql =
        "SELECT order_id, product_id, quantity, user_id, status FROM orders INNER JOIN order_products ON orders.id = order_products.order_id WHERE user_id = ($1)";
      const result = await conn.query(sql, [user_id]);
      const order = result.rows;
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not get order. Error: ${err}`);
    }
  }
}
