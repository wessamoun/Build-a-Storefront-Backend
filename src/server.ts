import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app: express.Application = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
