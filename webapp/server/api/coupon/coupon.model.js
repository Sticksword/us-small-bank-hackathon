'use strict';

import mongoose from 'mongoose';

var CouponSchema = new mongoose.Schema({
  couponID: Number,
  type: Number,
  discount: Number,
  description: String
});

export default mongoose.model('Coupon', CouponSchema);