'use strict';

import {Router} from 'express';
import * as controller from './payment.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();


router.get('/', controller.index);
router.post('/submitPayment', controller.submitPayment);

module.exports = router;
