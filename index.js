/*========================================================
 * Firebase Config
========================================================*/ 

var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount: "hack-small-DB-da827136648c.json",
  databaseURL: "https://hack-small-db.firebaseio.com"
});

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

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

/*========================================================
 * Routes
========================================================*/ 

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/payment.html');
});

app.post('/', function(req, res) {
  client.payment.create({
    amount : "1000",
    token : req.body.simplifyToken,
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

app.get('/fb', function (req, res) {
  res.sendFile(__dirname + '/fb-test.html');
});

/*========================================================
 * Create user
========================================================*/

app.post('/api/coupon', function(req, res) {
  createCoupon(req.body.couponID, req.body.type, req.body.amount, req.body.expiration, req.body.businessID);
  res.send('SUCCESS!');
});

function createCoupon(couponID, type, amount, expiration, businessID) {
  firebase.database().ref('coupons/' + couponID).set({
    type: type,
    amount: amount,
    expiration: expiration,
    businessID: businessID
  });
}

/*========================================================
 * Start App
========================================================*/ 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});