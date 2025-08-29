import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
import ErrorMessage from "./components/ErrorMessage";
import "./styles.css";

export default function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(true);

  async function fetchWeather(city) {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);
    setInitial(false);

    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        city
      )}&count=1`;
      const geoRes = await fetch(geoUrl);
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }

      const { latitude, longitude, name, country, admin1 } = geoData.results[0];

      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,weathercode,windspeed_10m,uv_index&daily=sunrise,sunset&timezone=auto`;
      const weatherRes = await fetch(weatherUrl);
      const data = await weatherRes.json();

      if (!data.current_weather) {
        throw new Error("Weather data not available");
      }

      setWeather({
        location: `${name}, ${admin1 ? admin1 + ", " : ""}${country}`,
        currentTemp: `${Math.round(data.current_weather.temperature)}°C`,
        weatherCode: data.current_weather.weathercode,
        windSpeed: `${data.current_weather.windspeed} km/h`,
        date: new Date(data.current_weather.time).toLocaleDateString(),
        hourly: data.hourly,
        daily: data.daily,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="weather-card">
      <h1>Weather Now</h1>
      <p className="subtitle">For outdoor enthusiasts like Jamie</p>

      <SearchBar onSearch={fetchWeather} />

      {initial && (
        <div className="initial-message">
          <i className="fas fa-cloud-sun weather-icon"></i>
          <p>Enter a city to check the current weather</p>
        </div>
      )}

      {loading && <p className="initial-message">Fetching weather data...</p>}

      {error && <ErrorMessage message={error} onRetry={fetchWeather} />}

      {weather && <WeatherDisplay data={weather} />}

      <p className="footer">Built for outdoor enthusiasts using Open-Meteo API</p>
    </div>
  );
}
