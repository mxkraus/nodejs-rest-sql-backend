var http = require("http");
var digestRequest = require("request-digest")(
  process.env.WH_USER,
  process.env.WH_PASS
);

exports.temperature = (req, res, next) => {
  digestRequest.request(
    {
      host: process.env.WH_HOST,
      path: "/api/1.0/datapoint/1/60/0/2/0/0",
      port: 80,
      method: "GET",
    },
    function (error, response, body) {
      if (error) {
        throw error;
      }

      res.json(JSON.parse(response.body));
    }
  );
};
