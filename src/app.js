const path = require("path");

const express = require("express");
const hbs = require("hbs");

const { geocode } = require("./utils/geocode");
const { getWeather } = require("./utils/weather");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Brett Plemons",
    name: "Brett Plemons",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Brett Plemons",
    message: "Please help me!",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Brett Plemons",
  });
});

app.get("/chat", (req, res) => {
  res.render("chat", {
    title: "Chat",
    name: "Brett Plemons",
  });
});

app.get("/notes", (req, res) => {
  res.render("notes", {
    title: "Notes",
    name: "Brett Plemons",
  });
});

app.get("/weather-app", (req, res) => {
  res.render("weather", {
    title: "Weather",
    name: "Brett Plemons",
  });
});

app.get("/task-manager", (req, res) => {
  res.render("task-manager", {
    title: "Task Manager",
    name: "Brett Plemons",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      type: "No Address Given",
      message: "You must provide a address term (Location | Lat/Long)",
    });
  }
  let latitude, longitude;
  geocode(req.query.address, (locationData, error) => {
    if (error) {
      return res.send({
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
            return res.send({
              type: error.type,
              message: error.message,
            });
          } else {
            res.send({
              address: {
                name: req.query.address,
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
});

app.get("*", (req, res) => {
  res.render("404");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
