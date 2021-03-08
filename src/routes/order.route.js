const { Router } = require('express');
const express = require('express');
const router = express.Router();
const order = require('../controllers/orders.controller');
const { populate } = require('../models/order.model');

router.post('/orders', order.create);
router.get('/orders/:id', order.getOrder);
router.get('/orders', order.getOrders);

module.exports = router; 