const express = require('express');
const router = express.Router();

const userRouter = require('./user.route');
const productRouter = require('./product.route')
const orderRouter = require('./order.route')
const categoryRouter = require('./category.route.js')

router.use(userRouter);
router.use(productRouter);
router.use(orderRouter);
router.use(categoryRouter);



module.exports = router;