import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan("dev"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port https://localhost:${PORT}`);
});
