import "dotenv/config";
import cors from "cors";
import Mux = require("@mux/mux-node");
import express = require("express");
require("express-async-errors");
import routes from "./routes";
const app = express();
const port = 3333;

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
app.use(routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
