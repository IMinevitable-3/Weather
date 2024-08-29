import axios from "axios";
import WeatherData from "../models/WeatherData.js";
import SearchHistory from "../models/searchHistory.js";
import { pushInDB } from "../utils/pushInDB.js";
import dotenv from "dotenv";
dotenv.config();
const API_KEY = process.env.OPEN_WEATHER_KEY || "openweathermap_api_key";

export const getWeatherByCoords = async (req, res, next) => {
  const { lat, lon } = req.body;

  try {
    const existingWeatherData = await WeatherData.findOne({
      "coord.lat": lat,
      "coord.lon": lon,
    });

    if (existingWeatherData) {
      await pushInDB(req, existingWeatherData.city_name, next);
      return res.status(200).json(existingWeatherData);
    } else {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      const weatherData = response.data;

      const newWeatherData = new WeatherData({
        coord: weatherData.coord,
        weather: weatherData.weather,
        base: weatherData.base,
        main: weatherData.main,
        visibility: weatherData.visibility,
        wind: weatherData.wind,
        rain: weatherData.rain,
        clouds: weatherData.clouds,
        dt: weatherData.dt,
        sys: weatherData.sys,
        timezone: weatherData.timezone,
        id: weatherData.id,
        name: weatherData.name,
        cod: weatherData.cod,
        city_name: req.body.city_name || weatherData.name,
      });

      await newWeatherData.save();
      await pushInDB(req, newWeatherData.city_name, next);
      return res.status(200).json(newWeatherData);
    }
  } catch (error) {
    next(error);
  }
};

export const getWeatherByCity = async (req, res, next) => {
  const { city_name } = req.body;
  try {
    const existingWeatherData = await WeatherData.findOne({
      city_name: city_name,
    });

    if (existingWeatherData) {
      await pushInDB(req, existingWeatherData.city_name, next);
      return res.status(200).json(existingWeatherData);
    } else {
      // console.log(API_KEY);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`
      );

      const weatherData = response.data;

      const newWeatherData = new WeatherData({
        coord: weatherData.coord,
        weather: weatherData.weather,
        base: weatherData.base,
        main: weatherData.main,
        visibility: weatherData.visibility,
        wind: weatherData.wind,
        rain: weatherData.rain,
        clouds: weatherData.clouds,
        dt: weatherData.dt,
        sys: weatherData.sys,
        timezone: weatherData.timezone,
        id: weatherData.id,
        name: weatherData.name,
        cod: weatherData.cod,
        city_name: city_name,
      });

      await newWeatherData.save();
      await pushInDB(req, newWeatherData.city_name, next);
      return res.status(200).json(newWeatherData);
    }
  } catch (error) {
    next(error);
  }
};
