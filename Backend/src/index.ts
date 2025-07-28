import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "https://notely-o6vj.vercel.app",
    credentials: true,
    methods: ["POST", "DELETE", "GET", "PUT", "PATCH"],
  })
);


app.use("/auth", authRoutes);



app.get("/", (_req, res) => {
  res.send("Welcome to Notely");
});

const PORT = process.env.PORT || 5656;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
