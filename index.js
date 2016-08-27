var firebase = require("firebase");

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCrCzugh4uMYfK1cRLWA0PCO4bEceal270",
  authDomain: "hack-small-db.firebaseapp.com",
  databaseURL: "https://hack-small-db.firebaseio.com",
  storageBucket: "hack-small-db.appspot.com",
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});