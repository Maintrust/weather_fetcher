const city = document.getElementById("city-name");
const character = document.getElementById("character");
const tempr = document.getElementById("temperature");
const weatherIcon = document.getElementById("weather-icon");
const comment = document.getElementById("comment");
const humidity = document.getElementById("humidity");
const pressure = document.getElementById("pressure");
const feelsLike = document.getElementById("feels-like");
const wind = document.getElementById("wind");
let map;

class UI {
  changeCity(data) {
    // Init map
    if (map) map.remove();
    DG.then(() => {
      map = DG.map("map", {
        center: [data.weather.coord.lat, data.weather.coord.lon],
        zoom: 8,
      });
    });

    city.textContent = data.weather.name + ", " + data.weather.sys.country;
    character.textContent = data.weather.weather[0].main;
    tempr.textContent =
      Math.round(data.weather.main.temp - 273.15) + ` C\u00b0`;
    humidity.textContent =
      "Relative humidity: " + data.weather.main.humidity + "%";
    feelsLike.textContent =
      "Feels like: " +
      Math.round(data.weather.main.feels_like - 273.15) +
      " C\u00b0";
    pressure.textContent = "Pressure: " + data.weather.main.pressure;
    wind.textContent = "Wind: " + data.weather.wind.speed + " m/s";
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather.weather[0].icon}.png`;
    const dayNight =
      data.weather.weather[0].icon.slice(-1) == "d" ? "Day" : "Night";

    comment.textContent = dayNight + ", " + data.weather.weather[0].description;
  }
}
