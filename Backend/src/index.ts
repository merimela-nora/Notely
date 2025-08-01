import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route";
import noteRoutes from "./routes/note.route";
import router from "./routes/user.route";

dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cookieParser());
// http://localhost:5173
// https://notely-o6vj.vercel.app
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["POST", "DELETE", "GET", "PUT", "PATCH"],
  })
);

app.use("/auth", authRoutes);
app.use("/note", noteRoutes);
app.use("/user", router);


app.get("/", (_req, res) => {
  res.send("Welcome to Notely");
});

const PORT = process.env.PORT || 5656;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
