var express = require("express");
var request = require("request");
var app = express();
var cors = require("cors");

app.use(cors());

app.get("/v1/schools/:degree/:major", function(req, res) {
  var major = req.params.major;

  var url =
    "https://api.data.gov/ed/collegescorecard/v1/schools/?" +
    "sort=2012.earnings.6_yrs_after_entry.percent_greater_than_25000%3Adesc&school.operating=1" +
    "&" +
    "2014.student.size__range=0.." +
    "&" +
    "2014.academics.program_available." +
    degree +
    "=true" +
    "&" +
    "2014.academics.program.degree." +
    major +
    "__range=1.." +
    "&" +
    "school.degrees_awarded.predominant__range=1..3" +
    "&" +
    "school.degrees_awarded.highest__range=2..4" +
    "&" +
    "fields=id%2Cschool.name%2Cschool.city%2Cschool.state%2C2014.student.size%2Cschool.ownership%2Cschool.degrees_awarded.predominant%2C2014.cost.avg_net_price.overall%2C2014.completion.rate_suppressed.overall%2C2012.earnings.10_yrs_after_entry.median%2C2012.earnings.6_yrs_after_entry.percent_greater_than_25000%2Cschool.under_investigation" +
    "&" +
    "api_key=38SEXdMNbMh1eIXMVNkThsu7zRgEPCdJ4eiRWAAU";

  // calls the callback function and error response and body will get populated
  request(url, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.send(body); // if no errors, send the body of data back to front end
    }
    res.send(error);
  });
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Server running on port 3000");
