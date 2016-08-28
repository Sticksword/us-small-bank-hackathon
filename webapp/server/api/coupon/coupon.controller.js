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
    res.send('base coupon api workings!');
}

// Creates a new Thing in the DB
export function create(req, res) {
  return Coupon.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

