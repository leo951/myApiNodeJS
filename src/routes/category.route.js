const { Router } = require('express');
const express = require('express');
const router = express.Router();
const category = require('../controllers/category.controller');
// const addUserRoleValidation = require('../middlewares/validators/users.role.validator')
const verifyAdminToken = require('../middlewares/verifyAdminToken')


// router.post('/products',addUserRoleValidation, product.create);
//Sans authorisation
router.post('/category', category.create);
router.get('/products/:title', category.getCategoryProduct);


module.exports = router; 