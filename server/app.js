const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

const API_KEY = "63eedeac";

const app = express();

app.use(morgan("dev"));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

let cache = {};

app.get("/", (req, res) => {
  // check url parameters using req.query
  // let search = req.query;
  // console.log(search);

  if (req.query.i) {
    if (cache[req.query.i]) {
      res.send(cache[req.query.i]);
    } else {
      axios
        .get("https://omdbapi.com/?i=" + `${req.query.i}` + `&apikey=8730e0e`)
        .then(response => {
          cache[req.query.i] = response.data;
          res.send(cache[req.query.i]);
        })
        .catch(err => console.log(err));
    }
  } else if (req.query.t) {
    if (cache[req.query.t]) {
      res.send(cache[req.query.t]);
    } else {
      axios
        .get("https://omdbapi.com/?t=" + `${req.query.t}` + `&apikey=8730e0e`)
        .then(response => {
          cache[req.query.t] = response.data;
          res.send(cache[req.query.t]);
        })
        .catch(err => console.log(err));
    }
  }
});

module.exports = app;
