import express from "express";
import {
  getWeatherByCoords,
  getWeatherByCity,
} from "../controllers/weather.controller.js";

const weatherRouter = express.Router();
weatherRouter.post("/getWeatherByCoords/", getWeatherByCoords);
weatherRouter.post("/getWeatherByCity/", getWeatherByCity);
export default weatherRouter;
