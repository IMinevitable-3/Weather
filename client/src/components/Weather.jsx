import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./Weather.css";
import searchIcon from "../assets/search.svg";
import cloudIcon from "../assets/cloud.png";
import clearIcon from "../assets/clear.png";
import drizzleIcon from "../assets/drizzle.png";
import humidityIcon from "../assets/humidity.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import windIcon from "../assets/wind.png";
import defaultIcon from "../assets/zeus.png";

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
const Weather = ({ addCityToHistory }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [weatherData, setWeatherData] = useState({
    humidity: "-",
    windSpeed: "-",
    temperature: "-",
    location: "NA",
    icon: defaultIcon,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const search = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const cityOrCoords = searchQuery.trim();
      if (cityOrCoords === "") return;
      let apiUrl, data;
      if (/^[-+]?\d{1,2}\.\d+[,;\s][-+]?\d{1,3}\.\d+$/.test(cityOrCoords)) {
        const [lat, lon] = cityOrCoords.split(/[,;\s]/).map(Number);
        apiUrl = import.meta.env.VITE_BASE_URL + "api/getWeatherByCoords/";
        data = { lat, lon };
      } else {
        const city = cityOrCoords;
        apiUrl = import.meta.env.VITE_BASE_URL + "api/getWeatherByCity";
        data = { city_name: city };
      }
      console.log(apiUrl, data);
      const response = await axios.post(apiUrl, data, {
        withCredentials: true,
      });
      // console.log(response.data);
      setWeatherData({
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        temperature: Math.floor(response.data.main.temp - 273.15),
        location: response.data.name,
        icon: Icons[response.data.weather[0].icon] || clearIcon,
      });
      addCityToHistory(response.data.name);
    } catch (err) {
      console.log(err);
      alert("City not found");
    } finally {
      setIsLoading(false);
    }
  };
  const getWeatherByGeolocation = async () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const { latitude: lat, longitude: lon } = position.coords;
          // console.log(lat, lon);
          const apiUrl =
            import.meta.env.VITE_BASE_URL + "api/getWeatherByCoords/";
          const response = await axios.post(
            apiUrl,
            { lat, lon },
            { withCredentials: true }
          );

          setWeatherData({
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed,
            temperature: Math.floor(response.data.main.temp - 273.15),
            location: response.data.name || `${lat}, ${lon}`,
            icon: Icons[response.data.weather[0].icon] || clearIcon,
          });
          addCityToHistory(response.data.name);
        } catch (err) {
          console.log(err);
          alert("Unable to fetch weather for your location");
        } finally {
          setIsLoading(false);
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };
  return (
    <div className="weather">
      <form onSubmit={search}>
        <div className="search-bar">
          <input
            type="text"
            placeholder="city or lat,long"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" disabled={isLoading} className="active-button">
            <img src={searchIcon} alt="search" />
          </button>
        </div>
        <button
          onClick={getWeatherByGeolocation}
          className="geo-button"
          disabled={isLoading}
        >
          Use My Location
        </button>
      </form>
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
