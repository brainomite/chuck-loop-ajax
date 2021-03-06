"use strict";
const path = require("path");
const express = require("express");

const MIN = 1;
const MAX = 5;
const app = express();

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// this serves up index.html at path of '/'
app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

// this serves up index.html at path of '/'
app.get("/assets/pollForData.js", function (_, res) {
  res.sendFile(path.join(__dirname, "assets", "pollForData.js"));
});

// this is the random robot generator
app.get("/robots", (_, res) => {
  res.statusCode = 200;
  if (randomIntFromInterval(MIN, MAX) === MAX) {
    res.send({ done: true }); // we are sending JSON representation of this obj
  } else {
    const robot = `https://robohash.org/${Date.now()}`;
    res.send({ robot }); // es6 shorthand syntax for {robot: robot}. also we are sending json
  }
});

const port = process.env.PORT || 4000;

const onListen = () => {
  console.log("Running on port " + port);
  console.log("connect to http://127.0.0.1:4000/");
};

// start the server and when ready, invoke onListen
app.listen(port, onListen);
