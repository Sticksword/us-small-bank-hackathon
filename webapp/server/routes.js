/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // app.use(function (req, res, next) {
  //   res.cookie('XSRF-TOKEN', req.csrfToken());
  //   res.locals.csrftoken = req.csrfToken();
  //   next();
  // });
  
  // Insert routes below
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/consumers', require('./api/consumer'));

  app.use('/api/payment', require('./api/payment'));
  app.use('/api/coupon', require('./api/coupon'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
