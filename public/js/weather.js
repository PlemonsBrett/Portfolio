const btn = document.getElementById("submit");
const input = document.getElementById("address");
const forecast = document.getElementById("forecast");

const forecastHTML = (data) => {
  const coords = `<p id="coords">(Lat: ${data.location.lat}, Long: ${data.location.long})</p>`;
  const heading = `<h3>Forecast for ${data.location.name} ${coords}</h3>`;
  const divStart = '<div id="forecast-details">';
  const location = `<p>Today in <strong id="location">${data.location.name}</strong>, it is `;
  const description = `<strong id="description">${data.description}</strong> with a `;
  const chanceOfRain = `<strong id="chance-rain">${data.chanceOfRain}%</strong> chance of rain.</p>`;
  const temperature = `<p>It is <strong id="temp">${data.currentTemp}&#730; F</strong>`;
  let feelsLike = " outside.";

  if (data.feelsLike !== data.currentTemp) {
    feelsLike = `, but it feels like <strong id="feels-like">${data.feelsLike}&#730; F</strong></p>`;
  }

  return (
    heading +
    divStart +
    location +
    description +
    chanceOfRain +
    temperature +
    feelsLike
  );
};

const errorHTML = (data) => {
  const type = `<h3 id="error-type">${data.type}</h3>`;
  const message = `<div id="error-container"><p id="error-message">${data.message}</p></div>`;

  return type + message;
};

btn.addEventListener("click", (e) => {
  if (input.value) {
    const data = input.value;
    const uriData = encodeURIComponent(data);
    fetch(`/weather?address=${uriData}`).then((response) => {
      response.json().then((data) => {
        if (data.type) {
          forecast.style.visibility = "visible";
          forecast.innerHTML = errorHTML(data);
        } else {
          forecast.style.visibility = "visible";
          forecast.innerHTML = forecastHTML(data);
        }
      });
    });
  } else {
    fetch("/weather").then((response) => {
      response.json().then((data) => {
        forecast.style.visibility = "visible";
        forecast.innerHTML = errorHTML(data);
      });
    });
  }
});
