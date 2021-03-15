const { Router } = require('express');
const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');
// const addUserRoleValidation = require('../middlewares/validators/users.role.validator')


// router.post('/products',addUserRoleValidation, product.create);
//Sans authorisation
router.get('/products/:id', product.getProduct);
router.get('/products', product.getAllProduct);

module.exports = router; 