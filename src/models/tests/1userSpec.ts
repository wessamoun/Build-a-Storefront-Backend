import { hash, UsersData } from "../user";
import dotenv from "dotenv";
dotenv.config();

const users = new UsersData();

describe("User Model", () => {
  it("should have an index method", () => {
    expect(users.index).toBeDefined();
  });

  it("should have a show method", () => {
    expect(users.show).toBeDefined();
  });

  it("should have a create method", () => {
    expect(users.create).toBeDefined();
  });
  it("should create a new user", async () => {
    const result = await users.create({
      id: 1,
      first_name: "ahmed",
      last_name: "ali",
      password_digest: hash,
    });
    expect(result).toEqual({
      id: 1,
      first_name: "ahmed",
      last_name: "ali",
      password_digest: hash,
    });
  });
  it("should list all users", async () => {
    const result = await users.index();
    expect(result).toEqual([
      {
        id: 1,
        first_name: "ahmed",
        last_name: "ali",
        password_digest: hash,
      },
    ]);
  });
  it("should show specific user", async () => {
    const result = await users.show(1);
    expect(result).toEqual({
      id: 1,
      first_name: "ahmed",
      last_name: "ali",
      password_digest: hash,
    });
  });
});
