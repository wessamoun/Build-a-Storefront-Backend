import client from "../database";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
const { SALT_ROUNDS, PEPPER } = process.env;
export let hash: string;

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  password_digest: string;
};

export class UsersData {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id = ($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not get user. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect();
      const sql =
        "INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3) RETURNING *";
      hash = bcrypt.hashSync(
        (u.password_digest as string) + PEPPER,
        parseInt(SALT_ROUNDS as string)
      );
      const result = await conn.query(sql, [u.first_name, u.last_name, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not create user. Error: ${err}`);
    }
  }
}
