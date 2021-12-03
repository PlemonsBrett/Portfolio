module.exports.weatherApp = (request, response) =>
  response.render("weather", { title: "Weather", name: "Brett Plemons" });
