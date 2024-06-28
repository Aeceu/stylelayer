import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import cart from "./routes/cart";
import product from "./routes/product";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/v1", cart);
app.use("/api/v1", product);

const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} ...`);
});
