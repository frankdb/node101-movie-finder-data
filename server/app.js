const express = require("express");
const morgan = require("morgan");
const axios = require("axios");

const API_KEY = "63eedeac";

const app = express();

app.use(morgan("dev"));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0e' parameter

const cache = {};

app.get("/", (req, res) => {
  // check url parameters using req.query
  // let search = req.query;
  // console.log(search);
  // axios
  //   .get("https://omdbapi.com/?i=" + `${req.query.i}` + `&apikey=8730e0e`)
  //   .then(response => {
  //     res.status(200).json(response.data);
  //   });
  console.log("Cache:", cache);
  if (!!req.query.i) {
    if (!!cache[req.query.i]) {
      console.log("Location A - cache");
      res.status(200).json(cache[req.query.i]);
      console.log("res.body:", res.body);
      console.log("res", res);
    } else {
      console.log("Location B - axios");
      axios
        .get("https://omdbapi.com/?i=" + req.query.i + "&apikey=63eedeac")
        .then(response => {
          cache[req.query.i] = response.data;
          res.status(200).json(cache[req.query.i]);
        })
        .catch(err => console.log(err));
    }
  } else if (!!req.query.t) {
    if (!!cache[req.query.t]) {
      console.log("Location A - cache");
      res.status(200).json(cache[req.query.t]);
      // console.log("res:", res);
      // console.log("res.body:", res.body);
    } else {
      console.log("Location B - axios");
      axios
        .get("https://omdbapi.com/?t=" + req.query.t + "&apikey=63eedeac")
        .then(response => {
          cache[req.query.t] = response.data;
          res.status(200).json(cache[req.query.t]);
        })
        .catch(err => console.log(err));
    }
  }
});

module.exports = app;
