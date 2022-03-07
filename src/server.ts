import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import usersRoute from "./handlers/user";
import productsRoute from "./handlers/product";
import ordersRoute from "./handlers/order";
import corsHeaders from "cors";

const app: express.Application = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(corsHeaders());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

usersRoute(app);
productsRoute(app);
ordersRoute(app);

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});

export default app;
