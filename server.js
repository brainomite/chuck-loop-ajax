"use strict";
const path = require("path");
const express = require("express");

const app = express();

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// this serves up index.html at path of '/'
app.get("/", function (_, res) {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

// this is the random robot generator
app.get("/robots", (_, res) => {
  res.statusCode = 200;
  if (randomIntFromInterval(1, 3) === 3) {
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
app.listen(port, onListen);
