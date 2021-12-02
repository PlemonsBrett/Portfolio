const http = require("http");
const url = require("url");
const qs = require("qs");

const getWeather = (latitude, longitude, callback) => {
  const weatherStackURL = "http://api.weatherstack.com";
  const weatherStackParams = {
    access_key: "9cf03ac1787a7125fdf57e97bb4d6b8e",
    query: `${latitude},${longitude}`,
    units: "f",
  };

  const weatherStackQueryString = qs.stringify(weatherStackParams);

  /**
   * Weather Stack has several API endpoints to choose from:
   *   - Current Weather: Get current weather data.  <-- Only one available with free account
   *     - Requirements:
   *       - access_key
   *       - query (Location)
   *     - Optional:
   *       - units
   *       - language
   *       - callback
   *   - Historical Weather: Get historical weather data.
   *   - Historical Time-Series: Get historical time-series weather data.
   *   - Weather Forecast: Get weather forecast for up to 14 days.
   *   - Location Lookup: Look up one or multiple locations.
   */

  const requestURL = new url.URL("/current?", weatherStackURL);

  const request = http.get(requestURL + weatherStackQueryString, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data = data + chunk.toString();
    });

    response.on("end", () => {
      const body = JSON.parse(data);
      if (body.error) {
        callback(undefined, {
          type: body.error.type,
          message: body.error.info,
        });
      } else {
        const { temperature, precip, weather_descriptions, feelslike } =
          body.current;
        const currentTemp = temperature;
        const chanceOfRain = precip !== 0 ? precip / 100 : precip;
        callback(
          {
            currentTemp: currentTemp,
            chanceOfRain: chanceOfRain,
            description: weather_descriptions[0],
            feelsLike: feelslike,
            location: body.location.name,
          },
          undefined
        );
      }
    });

    response.on("error", (error) => {
      callback(undefined, {
        type: "Error",
        message: error,
      });
    });
  });
};

module.exports = {
  getWeather: getWeather,
};
