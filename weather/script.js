// Select elements
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const locationButton = document.getElementById("location-button");
const weatherInfo = document.querySelector(".weather-info");
const errorMessage = document.getElementById("error-message");
const forecast = document.getElementById("forecast");
const forecastCards = document.getElementById("forecast-cards");

// Weather data display elements
const cityName = document.getElementById("city-name");
const description = document.getElementById("description");
const temp = document.getElementById("temp");
const weatherIcon = document.getElementById("weather-icon");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// OpenWeather API key
const apiKey = "fe3a4add9f2bdf5862068a2fb953e772"; // Replace with your OpenWeather API key

// Fetch current weather
async function getWeatherData(city) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeatherData(data);
    getForecastData(data.coord.lat, data.coord.lon);
  } catch (error) {
    displayError(error.message);
  }
}

// Fetch 5-day forecast
async function getForecastData(lat, lon) {
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(forecastURL);
    if (!response.ok) {
      throw new Error("Unable to fetch forecast data");
    }

    const data = await response.json();
    displayForecastData(data.list);
  } catch (error) {
    displayError(error.message);
  }
}

// Display weather data
function displayWeatherData(data) {
  weatherInfo.classList.remove("hidden");
  errorMessage.classList.add("hidden");

  cityName.textContent = data.name;
  description.textContent = data.weather[0].description;
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  humidity.textContent = data.main.humidity;
  wind.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
}

// Display forecast data
function displayForecastData(forecastList) {
  forecast.classList.remove("hidden");
  forecastCards.innerHTML = ""; // Clear previous forecast

  // Filter forecast for every 8th index (daily forecasts)
  const dailyForecasts = forecastList.filter((_, index) => index % 8 === 0);

  dailyForecasts.forEach((forecast) => {
    const card = document.createElement("div");
    card.classList.add("forecast-card");

    card.innerHTML = `
            <p>${new Date(forecast.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            })}</p>
            <img src="https://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="Weather icon">
            <p>${Math.round(forecast.main.temp)}°C</p>
        `;
    forecastCards.appendChild(card);
  });
}

// Display error message
function displayError(message) {
  weatherInfo.classList.add("hidden");
  forecast.classList.add("hidden");
  errorMessage.classList.remove("hidden");
  errorMessage.textContent = message;
}

// Use geolocation to fetch weather
locationButton.addEventListener("click", () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        getWeatherDataByCoordinates(latitude, longitude);
      },
      (error) => {
        displayError("Geolocation not enabled.");
      }
    );
  } else {
    displayError("Geolocation is not supported by this browser.");
  }
});

// Fetch weather by coordinates
async function getWeatherDataByCoordinates(lat, lon) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }

    const data = await response.json();
    displayWeatherData(data);
    getForecastData(lat, lon);
  } catch (error) {
    displayError(error.message);
  }
}

// Search button event
searchButton.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  } else {
    displayError("Please enter a city name.");
  }
});
