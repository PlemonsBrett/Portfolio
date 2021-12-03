// API Imports
const path = require("path");

// 3rd Party API Imports
const express = require("express");
const hbs = require("hbs");

// Internal Imports
const { siteInfo } = require("./siteInfo");
const { chat } = require("./chat");
const { notes } = require("./noteApp");
const { taskManager } = require("./taskManager");
const { weatherApp } = require("./weather/weatherController");
const { weatherAPI } = require("./weather/weatherAPI");

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

app.get("/site-info", (req, res) => siteInfo(req, res));

app.get("/chat", (req, res) => chat(req, res));

app.get("/notes", (req, res) => notes(req, res));

app.get("/weather-app", (req, res) => weatherApp(req, res));

app.get("/task-manager", (req, res) => taskManager(req, res));

app.get("/weather", (req, res) => weatherAPI(req, res));

app.get("*", (req, res) => {
  res.render("404");
});

// Port Set and Listen
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
