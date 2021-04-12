const { Router } = require('express');
const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');
// const addUserRoleValidation = require('../middlewares/validators/users.role.validator')
const verifyAdminToken = require('../middlewares/verifyAdminToken')


// router.post('/products',addUserRoleValidation, product.create);
//Sans authorisation
router.post('/products', product.create);
router.get('/products/all', product.getAllProduct);
router.get('/products/:id', product.getProduct);

//isAdmin
router.post('/products/update/:id', product.modifyProduct);
router.get('/products/delete/:id', product.deleteProduct);

module.exports = router; 