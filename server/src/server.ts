import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import 'dotenv/config';

const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT)

app.listen(PORT, () => {
    console.log(`Server is running on port https://localhost:${PORT}`);
})