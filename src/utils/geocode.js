const https = require("https");
const qs = require("qs");

const geocode = (address, callback) => {
  const mapBoxAccessToken =
    "pk.eyJ1IjoicGxlbW9uc2JyZXR0IiwiYSI6ImNrd28zNzlpaDBjZmwycG80NjE4ZG83aW4ifQ.wwd7CIycKCDQI6CgtCFQMw";

  const mapBoxBaseURL = "https://api.mapbox.com";
  const geoCodingURI = "geocoding/v5/mapbox.places/";

  const params = {
    access_token: mapBoxAccessToken,
    limit: 1,
  };

  const mapBoxQueryString = qs.stringify(params);

  const url =
    mapBoxBaseURL +
    "/" +
    geoCodingURI +
    encodeURIComponent(address) +
    ".json?" +
    mapBoxQueryString;

  const request = https.request(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data = data + chunk.toString();
    });

    response.on("end", () => {
      const body = JSON.parse(data);
      if (body.features.length === 0) {
        callback(undefined, {
          type: "No Results",
          message: "Unable to find location. Try another search.",
        });
      } else {
        callback(
          {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
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
  request.end();
};

module.exports = {
  geocode: geocode,
};
