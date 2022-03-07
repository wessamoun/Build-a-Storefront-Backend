import express from "express";
import { Order, OrderProducts, OrderData } from "../models/order";
import jwt from "jsonwebtoken";
import { token } from "./user";
import dotenv from "dotenv";
dotenv.config();

const orders = new OrderData();

const create = async (req: express.Request, res: express.Response) => {
  const order: Order = {
    user_id: req.params.id,
    status: req.body.status,
  };
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
  try {
    const newOrder = await orders.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
  try {
    const showUser = await orders.show(parseInt(req.params.id));
    res.json(showUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: express.Request, res: express.Response) => {
  const op: OrderProducts = {
    quantity: req.body.quantity,
    order_id: req.params.orderId,
    product_id: req.body.product_id,
  };

  try {
    const addedProduct = await orders.addProduct(op);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const ordersRoute = (app: express.Application) => {
  app.post("/users/:id/orders", create);
  app.get("/users/:id/orders", show);
  app.post("/users/:id/orders/:orderId/products", addProduct);
};

export default ordersRoute;
