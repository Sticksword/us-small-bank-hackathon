'use strict';

import Consumer from './consumer.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * Get list of consumers
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new consumer
 */
export function create(req, res, next) {
  var newUser = new Consumer(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';

  var FB = require('fb');
  var access_token = 'EAACEdEose0cBAOZBkQDEMOPmcJLS2wBvFkVZCKMS5dBaZCfIb8iME4hcU9eIucbxHND59oYckWpmr6BNfZBDMz7ffsbQM49fpC5LJnbPbVyuWxKLCPJHxoL1jjZBCpvmnbL1lVGMUKP3k2UDPZC27Kgrttc2moeuV7KJTmb2Qnxz80LdLebW9P';
  // var access_token = req.params.access_token;
  FB.setAccessToken(access_token);
  FB.api('me/accounts', 'get', function (res) {
    if(!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }
    if(!res.data[0])
      return;
    newUser.name = res.data[0].name;
    newUser.id = res.data[0].id;
  });

  newUser.save()
    .then(function(user) {
      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single consumer
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return Consumer.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a consumer
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return Consumer.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a consumers password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return Consumer.findById(userId).exec()
    .then(user => {
      if (user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return Consumer.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if (!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}
