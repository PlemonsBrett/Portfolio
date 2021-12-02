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

app.get("/site-info", (req, res) => {
  res.render("siteInfo", {
    title: "Site Info",
    name: "Brett Plemons",
    tools: [
      {
        name: "NodeJS",
        version: "16.13.0",
        link: "https://nodejs.org/en/",
        use: "Server API",
        logo: "https://nodejs.org/static/images/logo.svg",
      },
      {
        name: "Yarn",
        version: "1.22.17",
        link: "https://yarnpkg.com/",
        use: "Package Manager",
        logo: "img/yarn.png",
      },
      {
        name: "Heroku",
        version: "2021",
        link: "https://www.heroku.com",
        use: "Hosting",
        logo: "img/heroku.png",
      },
      {
        name: "Express",
        version: "4.17.1",
        link: "https://expressjs.com/",
        use: "Server Framework",
        logo: "https://www.nextontop.com/assets/img/services/web/expressjs.svg",
      },
      {
        name: "Handlebars (as HBS)",
        version: "4.2.0",
        link: "https://github.com/pillarjs/hbs#readme",
        use: "Templating Engine",
        logo: "https://handlebarsjs.com/images/handlebars_logo.png",
      },
      {
        name: "QS (QueryString)",
        version: "6.10.1",
        link: "https://github.com/ljharb/qs",
        use: "Parsing JSON to QueryStrings",
        logo: "img/qs-logo.png",
      },
      {
        name: "PM2",
        version: "5.1.2",
        link: "https://pm2.keymetrics.io/",
        use: "Process Manager",
        logo: "https://pm2.keymetrics.io/assets/pm2-logo-1.png",
      },
      {
        name: "Yargs",
        version: "17.3.0",
        link: "https://yargs.js.org/",
        use: "Command-Line Tools",
        logo: "https://raw.githubusercontent.com/yargs/yargs/main/yargs-logo.png",
      },
      {
        name: "ESLint",
        version: "8.3.0 (Airbnb)",
        link: "https://eslint.org/",
        use: "Linter",
        logo: "https://d33wubrfki0l68.cloudfront.net/204482ca413433c80cd14fe369e2181dd97a2a40/092e2/assets/img/logo.svg",
      },
      {
        name: "Prettier",
        version: "2.5.0",
        link: "https://prettier.io/",
        use: "Formatter",
        logo: "img/Prettier.png",
      },
    ],
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
