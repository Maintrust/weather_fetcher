class Weather {
  constructor() {
    this.apiKey = "09a1d8908bc396da18709cfa1fbf1974";
  }
  async getWeather(city) {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`
    );

    const weather = await weatherResponse.json();

    return {
      weather,
    };
  }

  async getWeatherByCoords(lat, lon) {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    );

    const weather = await weatherResponse.json();

    return {
      weather,
    };
  }
}
