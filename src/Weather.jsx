import React, { useState } from "react";
import axios from "axios";
import "./Weather.css"; 

const WeatherCard = ({ title, data }) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{data}</p>
    </div>
  );
};

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "07214be0562e47209a7123615242709"; // Replace with your actual API key

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError("Failed to fetch weather data");
      alert("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="weather-display">
      <h1>XWeatherApp</h1>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <WeatherCard
            title="Temperature"
            data={`${weatherData.current.temp_c}°C`}
          />
          <WeatherCard
            title="Humidity"
            data={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            data={weatherData.current.condition.text}
          />
          <WeatherCard
            title="Wind Speed"
            data={`${weatherData.current.wind_kph} kph`}
          />
        </div>
      )}
    </div>
  );
};

export default Weather;