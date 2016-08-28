'use strict';
import config from '../../config/environment';
import Coupon from './coupon.model';

/**
 * testing base page
 */
export function index(req, res) {
    res.send('base coupon api working!');
}

// Creates a new Thing in the DB
export function create(req, res) {
  return Coupon.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

