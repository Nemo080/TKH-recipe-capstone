import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;

const logger = (req, _res, next) => {
    const time = new Date().toLocaleTimeString();
    console.log(`${time} ${req.method}: ${req.url}`);
    next();
};
app.use(cors())
app.use(express.json())
app.use(logger);
app.use("/auth", authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});