'use strict';
import _ from 'lodash';
import Coupon from './coupon.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * testing base page
 */
export function index(req, res) {
  console.log("index")
  Coupon.findById("57c30e1d7efdcf720545b987").then(function(res) {
      console.log(res);
  })
  res.send('base coupon api workings!');
}

export function show(req, res, next) {
  var userId = req.params.id;

  return Coupon.findById(userId).exec()
    .then(user => {
      if (!user) {
        return res.status(404).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

// Creates a new Coupon in the DB
export function create(req, res) {
  console.log(req.body)
  return Coupon.create(req.body).then(respondWithResult(res, 201))
    .catch(handleError(res));
}

