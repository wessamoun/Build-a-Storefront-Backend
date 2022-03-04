import client from "../database";
export type Order = {
  id: number;
  quantity: number;
  product_id: string;
  user_id: string;
  status: string;
};

export class OrderData {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO orders (quantity, product_id, user_id, status) VALUES ($1, $2, $3, $4) RETURNING *";
      const result = await conn.query(sql, [
        o.quantity,
        o.product_id,
        o.user_id,
        o.status,
      ]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not create order. Error: ${err}`);
    }
  }
  async show(user_id: number): Promise<Order> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM orders WHERE user_id = ($1)";
      const result = await conn.query(sql, [user_id]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not get order. Error: ${err}`);
    }
  }
}
