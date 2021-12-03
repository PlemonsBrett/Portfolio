const { geocode } = require("../utils/geocode");
const { getWeather } = require("../utils/weather");

module.exports.weatherAPI = (request, response) => {
  if (!request.query.address) {
    return response.send({
      type: error.type,
      message: error.message,
    });
  }
  let latitude, longitude;
  geocode(request.query.address, (locationData, error) => {
    if (error) {
      return response.send({
        type: error.type,
        message: error.message,
      });
    } else {
      latitude = locationData.latitude;
      longitude = locationData.longitude;
      getWeather(
        locationData.latitude,
        locationData.longitude,
        (weatherData, error) => {
          if (error) {
            return response.send({
              type: error.type,
              message: error.message,
            });
          } else {
            response.send({
              address: {
                name: request.query.address,
              },
              location: {
                name: weatherData.location,
                lat: latitude,
                long: longitude,
              },
              currentTemp: weatherData.currentTemp,
              description: weatherData.description,
              feelsLike: weatherData.feelsLike,
              chanceOfRain: weatherData.chanceOfRain,
            });
          }
        }
      );
    }
  });
};
