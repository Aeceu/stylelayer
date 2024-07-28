import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import user from "./routes/user";
import cart from "./routes/cart";
import order from "./routes/order";
import product from "./routes/product";

dotenv.config();
const app = express();

const allowedOrigin = ["https://stylelayer.vercel.app", "https://admin.stylelayer.vercel.app"];
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (allowedOrigin.includes(origin!)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }

  next();
});
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigin.indexOf(origin!) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    optionsSuccessStatus: 200,
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", user);
app.use("/api/v1", cart);
app.use("/api/v1", order);
app.use("/api/v1", product);

const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} ...`);
});

export default app;
