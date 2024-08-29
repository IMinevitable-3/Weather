import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";

import weatherRouter from "./routes/weather.routes.js";
import userRouter from "./routes/user.routes.js";
import SearchHistory from "./models/searchHistory.js";
dotenv.config();

//constants
const MONGO_URI = process.env.MONGO,
  PORT = process.env.PORT || 3000,
  __dirname = path.resolve();

//database
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT || "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(async (req, res, next) => {
  let token = req.cookies.token;

  if (!token) {
    token = uuidv4();
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    await SearchHistory.create({ token, history: [] });
  }

  req.token = token;
  next();
});
app.use("/api", weatherRouter);
app.use("/user", userRouter);
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 500;
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// server listening
app.listen(PORT, (req, res) => {
  console.log(`hello! from server running on port ${PORT}`);
});
