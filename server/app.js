const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

const API_KEY = "63eedeac";

const app = express();

app.use(morgan("dev"));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

app.get("/", (req, res) => {
  // check url parameters using req.query
  // let search = req.query;
  // console.log(search);

  if (req.query.i) {
    axios
      .get("https://omdbapi.com/?i=" + `${req.query.i}` + `&apikey=${API_KEY}`)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  } else if (req.query.t) {
    axios
      .get("https://omdbapi.com/?t=" + `${req.query.t}` + `&apikey=${API_KEY}`)
      .then(response => console.log(response))
      .catch(err => console.log(err));
  }
});

module.exports = app;
