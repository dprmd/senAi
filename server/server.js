import express from "express";
import cors from "cors";
import { router } from "./routes/routes.js";
import bodyParser from "body-parser";

export const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
