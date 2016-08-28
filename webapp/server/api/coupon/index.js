'use strict';

import {Router} from 'express';
import * as controller from './coupon.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', controller.index);
router.post('/', controller.create);

module.exports = router;