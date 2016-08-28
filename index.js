/*========================================================
 * Firebase Config
========================================================*/ 

var firebase = require("firebase");

var config = {
  apiKey: "AIzaSyCrCzugh4uMYfK1cRLWA0PCO4bEceal270",
  authDomain: "hack-small-db.firebaseapp.com",
  databaseURL: "https://hack-small-db.firebaseio.com",
  storageBucket: "hack-small-db.appspot.com",
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

/*========================================================
 * Simplify Config
========================================================*/ 

var SIMPLIFY_PUB_KEY = 'sbpb_YWE1NDE2ZjYtZWJmMi00MmZlLTllMGYtOTcwZjk5NDhiODcy';
var SIMPLIFY_PRIV_KEY = 'rDXIEfv/2sNzPty6VSnOMeiWMPa2LiATUdpxLXd/bBx5YFFQL0ODSXAOkNtXTToq';

var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: SIMPLIFY_PUB_KEY,
        privateKey: SIMPLIFY_PRIV_KEY
    });

/*========================================================
 * App config
========================================================*/ 

var express = require('express');
var app = express();

/*========================================================
 * Routes
========================================================*/ 

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/payment.html');
});

app.post('/', function(req, res) {
  client.payment.create({
    amount : "1000",
    token : "[TOKEN ID]",
    description : "payment description",
    reference : "7a6ef6be31",
    currency : "USD"
  }, function(errData, data){
 
    if(errData){
      console.error("Error Message: " + errData.data.error.message);
      // handle the error
      res.status(500);
      return;
    }
   
    console.log("Payment Status: " + data.paymentStatus);
  });
  res.send('SUCCESS');
});

/*========================================================
 * Start App
========================================================*/ 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});