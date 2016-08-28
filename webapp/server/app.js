/**
 * Main application file
 */

'use strict';

import express from 'express';
import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();

var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true });
var customCsrf = function (req, res, next) {
    // I assume exact match, but you can use regex match here
  var csrfEnabled = true;
  var whiteList = new Array("/payment","/api/payment/submitPayment","/api/coupon/");
  if (whiteList.indexOf(req.path) != -1) {
    csrfEnabled = false;
  }

  console.log('the req path:');
  console.log(req.path);

  if (csrfEnabled) {
    app.use(csrfProtection);
    console.log('using protection!!');
  } else {
    next();
  }
}

var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
