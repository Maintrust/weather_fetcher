window.addEventListener(
  "orientationchange",
  function () {
    // Выводим числовое значение ориентации
    console.log("ПОВЕРНУЛИ!");
  },
  false
);

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.city) {
    const weather = new Weather();
    const ui = new UI();
    weather.getWeather(localStorage.city).then((data) => {
      console.log(data);
      ui.changeCity(data);
    });
  } else {
    const weather = new Weather();
    const ui = new UI();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(pos);
        weather
          .getWeatherByCoords(pos.coords.latitude, pos.coords.longitude)
          .then((data) => {
            console.log(data);
            ui.changeCity(data);
          });
      },
      (e) => {
        let position = "Saint Petersburg";
        const timeZone = new Date().getTimezoneOffset() / 60;
        weather.getWeather(position).then((data) => {
          console.log(data);
          ui.changeCity(data);
        });
      }
    );
  }
});

document.getElementById("button").addEventListener("click", openForm);
document.getElementById("cross").addEventListener("click", closeForm);
document.querySelector("form").addEventListener("submit", changeCity);
const field = document.getElementById("city");
function openForm() {
  document.getElementById("form-container").style.display = "flex";
}
function closeForm() {
  document.getElementById("form-container").style.display = "none";
}
function changeCity(e) {
  console.log(field.value);
  if (field.value !== "") {
    const weather = new Weather();
    const ui = new UI();
    weather.getWeather(field.value).then((data) => {
      console.log(data);
      console.log(data.weather.cod);
      if (data.weather.cod == 404) {
        alert("Wrong city name");
        e.preventDefault();
        return;
      }

      if (data.weather.cod == 200) {
        ui.changeCity(data);
        localStorage.setItem("city", field.value);
        field.value = "";
        document.getElementById("form-container").style.display = "none";
      }
    });
  }
  e.preventDefault();
}
