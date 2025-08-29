
# Weather Now

A fast, simple weather app for Jamie (an outdoor enthusiast) to quickly check current weather for any city. Built with React and the Open‑Meteo API (no API key needed).

 ## 🎯  Project Goals

- Speed: Show current conditions with minimal clicks.
- Simplicity: Clean UI with clear data (temp, feels like, wind, humidity, condition).
- Accuracy: Uses Open‑Meteo (free, reliable, no key).
- Accessibility: Keyboard‑friendly and screen‑reader friendly.
- Responsive: Works great on mobile and desktop.

## ✨  Features

- City search with autosuggest (via Open‑Meteo Geocoding API).
- Current weather card: temperature, apparent temperature, humidity, wind speed, condition icon.
- Quick history: recently searched cities (localStorage).
- Unit toggle: °C / °F (optional).
- Error & empty states: helpful messages when city not found or network fails.
- Lightweight: fetch() only; no API key.

## 🧰 Tech Stack

- Frontend: React (recommended with Vite)
- Styling: Tailwind CSS (or plain CSS modules)
- State: React hooks (useState, useEffect)
- HTTP: native fetch()
- Icons: WeatherCode → emoji or icon set mapping

## 🏗️ Architecture (Simple Flow)

- SearchBar → calls Geocoding API to resolve name → (lat, lon)
- WeatherService → calls Forecast API with (lat, lon) → returns current fields
- App State → updates UI components (CurrentWeather, Highlights)

## 🌐 APIs Used (Open‑Meteo)

- Geocoding (city → coordinates): https://geocoding-api.open-meteo.com/v1/search?name=London&count=1&language=en&format=json
- Forecast (current conditions): https://api.open-meteo.com/v1/forecast?latitude=51.5085&longitude=-0.1257&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=aut

## 📦 Getting Started
# Using Vite (recommended)
npm create vite@latest weather-now -- --template react
cd weather-now
npm install
npm run dev
