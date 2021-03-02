const { Router } = require('express');
const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');

router.post('/products', product.create);
//Sans authorisation
router.get('/products/:id', product.getProduct);
router.get('/products', product.getAllProduct);

module.exports = router; 