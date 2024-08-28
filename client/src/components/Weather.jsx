import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Weather.css";
import searchIcon from "../assets/searchx.png";
import cloudIcon from "../assets/cloud.png";
import clearIcon from "../assets/clear.png";
import drizzleIcon from "../assets/drizzle.png";
import humidityIcon from "../assets/humidity.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";

const Icons = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": cloudIcon,
  "03n": cloudIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "11d": snowIcon,
  "11n": snowIcon,
  "13d": snowIcon,
  "13n": snowIcon,
};
const Weather = () => {
  const [weatherData, setWeatherData] = useState(false);
  const inpRef = useRef();
  const search = async (city) => {
    try {
      if (city === "") return;
      const apiUrl = import.meta.env.VITE_BASE_URL + "api/getWeatherByCity";
      console.log(apiUrl);
      const response = await axios.post(apiUrl, { city_name: city });
      //   console.log(response);
      if (!response.ok) {
        alert("city not found");
        return;
      }
      setWeatherData({
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        temperature: Math.floor(response.data.main.temp - 273.15),
        location: response.data.name,
        icon: Icons[response.data.weather[0].icon] || clearIcon,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    search("Gajuwaka");
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inpRef} type="text" placeholder="search for a city" />
        <img
          src={searchIcon}
          alt="search"
          onClick={() => search(inpRef.current.value)}
        />
      </div>
      <img src={weatherData?.icon} alt="" className="weather-icon" />
      <p className="temperature">{weatherData?.temperature}°c</p>
      <p className="location">{weatherData?.location}</p>

      <div className="weather-data">
        <div className="col">
          <img src={humidityIcon} alt="" />
          <div>
            <p>{weatherData?.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={windIcon} alt="" />
          <div>
            <p>{weatherData?.windSpeed}km/h</p>
            <span>Wind</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
