import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors());

const PORT = 4200;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} ...`);
});
