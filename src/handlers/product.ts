import express from "express";
import { Product, ProductsData } from "../models/product";
import jwt from "jsonwebtoken";
import { token } from "./user";
import dotenv from "dotenv";
dotenv.config();

const products = new ProductsData();

const create = async (req: express.Request, res: express.Response) => {
  const product: Product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
  };
  try {
    jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
  try {
    const newProduct = await products.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const index = async (req: express.Request, res: express.Response) => {
  try {
    const allProducts = await products.index();
    res.json(allProducts);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: express.Request, res: express.Response) => {
  try {
    const showUser = await products.show(parseInt(req.params.idProduct));
    res.json(showUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productsRoute = (app: express.Application) => {
  app.post("/users/products", create);
  app.get("/products", index);
  app.get("/products/:idProduct", show);
};

export default productsRoute;
