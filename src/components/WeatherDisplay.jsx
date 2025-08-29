import React from "react";

export default function WeatherDisplay({ data }) {
  const { location, currentTemp, windSpeed, weatherCode, date, hourly, daily } =
    data;

  function getWeatherDescription(code) {
    const codes = {
      0: { description: "Clear sky", icon: "fa-sun" },
      1: { description: "Mainly clear", icon: "fa-cloud-sun" },
      2: { description: "Partly cloudy", icon: "fa-cloud-sun" },
      3: { description: "Overcast", icon: "fa-cloud" },
      63: { description: "Rain", icon: "fa-cloud-showers-heavy" },
      75: { description: "Snow", icon: "fa-snowflake" },
      95: { description: "Thunderstorm", icon: "fa-bolt" },
    };
    return codes[code] || { description: "Unknown", icon: "fa-question" };
  }

  const weatherInfo = getWeatherDescription(weatherCode);

  // humidity for current hour
  const now = new Date();
  const hourIndex = hourly.time.findIndex(
    (t) => new Date(t).getHours() === now.getHours()
  );
  const humidity = hourly.relativehumidity_2m[hourIndex];
  const uvIndex = hourly.uv_index[hourIndex];

  const sunrise = new Date(daily.sunrise[0]).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const sunset = new Date(daily.sunset[0]).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="text-center">
      <h2>{location}</h2>
      <p>{date}</p>
      <h1>{currentTemp}</h1>
      <div className="weather-icon">
        <i className={`fas ${weatherInfo.icon}`}></i>
      </div>
      <p>{weatherInfo.description}</p>

      <div className="stats">
        <div>
          <p>Wind</p>
          <strong>{windSpeed}</strong>
        </div>
        <div>
          <p>Humidity</p>
          <strong>{humidity}%</strong>
        </div>
        <div>
          <p>UV Index</p>
          <strong>{uvIndex}</strong>
        </div>
      </div>

      <div style={{ marginTop: "16px" }}>
        <p>🌅 {sunrise} &nbsp;&nbsp; 🌇 {sunset}</p>
      </div>
    </div>
  );
}
