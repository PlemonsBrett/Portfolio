const data = require("./site-info.json");

module.exports.siteInfo = (request, response) =>
  response.render("siteInfo", data);
