let inputButton = document.querySelector("#search-btn");
let searchedCity = document.querySelector("#searched-city");
let currentTemperature = document.querySelector("#current-temperature");
let temperatureBtn = document.querySelector("#temperature-btn");
let currentIcon = document.querySelector("#current-icon");

//  Temperature Conversion Formulaes
let celsiusToFahrenheit = (temperature) => {
  return Math.round((temperature * 9) / 5 + 32);
};

inputButton.addEventListener("click", () => {
  let city = document.querySelector("#search-city").value;
  const api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=c87b73968acdc814157d174a59ddd93c`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let temp = data.main.temp;
      currentTemperature.innerText = Math.round(temp) + "°C";
      searchedCity.innerText = data.name + ", " + data.sys.country;
      currentTemperature.addEventListener("click", () => {
        let searchCRegEx = /°C/;
        if (currentTemperature.innerText.match(searchCRegEx)) {
          currentTemperature.innerText = celsiusToFahrenheit(temp) + "°F";
        } else {
          currentTemperature.innerText = Math.round(temp) + "°C";
        }
      });
      let iconCode = data.weather[0].icon;
      const iconURL = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
      currentIcon.setAttribute("src", iconURL);
    })
    .catch((err) => {
      console.warn("Something went wrong " + err);
    });
});

/*
window.addEventListener("load", () => {
  let lat;
  let lon;
  let searchedCity = document.querySelector("#searched-city");
  let currentTemperature = document.querySelector("#current-temperature");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lon = position.coords.longitude;

      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c87b73968acdc814157d174a59ddd93c`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          //const { temp } = data.main;
          currentTemperature.innerText = kelvinToCelsius(data.main.temp) + "°C";
          searchedCity.innerText = data.name + ", " + data.sys.country;
        })
        .catch((err) => {
          console.warn("Something went wrong, " + err);
        });
    });
  }
});

*/