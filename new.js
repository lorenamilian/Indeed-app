require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");

const request = require("request");

const app = express();

const apiKey = process.env.KEY;

console.log(process.env.KEY);

//setting view engine
app.set("view engine", "ejs");

//middleware
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: false }));

//ROUTES

//get
app.get("/", function(req, res) {
  res.render("main.ejs");
});

app.get("/indeed", function(req, res) {
  res.render("indeed.ejs", { weather: null, error: null });
});

app.post("/", function(req, res) {
  let err = false;

  let url =
    "https://authenticjobs.com/api/?api_key=" +
    apiKey +
    "&method=aj.categories.getlist";

  request(url, function(error, response, body) {
    if (error) {
      res.render("indeed.ejs", { job: null, error: "Error Please try again" });
    } else {
      let job = JSON.parse(body);
      if (job == undefined) {
        res.render("indeed.ejs", { job: null, error: "Please try again" });
      } else {
        let alljobs = "the weather " + req.body.work + " " + job;
        res.render("indeed.ejs", { job: alljobs, error: null });
      }
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("my server is running better");
});
