import express from "express";
import { getSearchHistory } from "../controllers/userHistory.controller.js";

const userRouter = express.Router();
userRouter.get("/getSearchHistory", getSearchHistory);
export default userRouter;
