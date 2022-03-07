import express from "express";
import { User, UsersData } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const users = new UsersData();
// I used that method to make it easy in use as it small app for training and testing
// for real app we pass them as a special header called the Authorization header
// then we can get that header by many ways one of them by a middleware (i made an commented example for it at the bottom)
export let token: string;

const create = async (req: express.Request, res: express.Response) => {
  const user: User = {
    id: req.body.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password_digest: req.body.password,
  };
  try {
    const newUser = await users.create(user);
    token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(`Error: ${err} ${user}`);
  }
};

const index = async (req: express.Request, res: express.Response) => {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json(`Error: ${err}`);
  }
  try {
    const allUsers = await users.index();
    // res.set({ Authorization: `Bearer ${token}` });
    res.json(allUsers);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(401);
    res.json(`Error: ${err}`);
  }
  try {
    const showUser = await users.show(parseInt(req.params.id));
    res.json(showUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// const tokenVerifyMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   try {
//       const authorizationHeader = req.header('Authorization')
//       const token = authorizationHeader.split(' ')[1]
//       const decoded = jwt.verify(token, process.env.TOKEN_SECRET)

//       next()
//   } catch (error) {
//       res.status(401)
//   }
// }

const usersRoute = (app: express.Application) => {
  app.post("/users", create);
  app.get("/users", index);
  app.get("/users/:id", show);
};

export default usersRoute;
