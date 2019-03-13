const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

const API_KEY = "63eedeac";

const app = express();

app.use(morgan("dev"));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

app.get("/", (req, res) => {
  // check url parameters using req.query
  axios
    .get("http://omdbapi.com/?i=" + "tt3896198" + `&apikey=${API_KEY}`)
    .then(response => console.log(response));
});

module.exports = app;
