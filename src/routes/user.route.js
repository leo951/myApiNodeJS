const { Router } = require('express');
const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');
const verifyAdminToken = require('../middlewares/verifyAdminToken')
const addUserValidation = require('../middlewares/validators/users.validator');
const addUserRoleValidation = require('../middlewares/validators/users.role.validator')

router.post('/users', addUserValidation, user.create);
router.post('/users/admin', addUserRoleValidation, user.createAdmin) 
router.post('/users/login', user.login);
router.post('/users/loginAdmin', user.loginAdmin);

router.post('/users/update/:id', user.modifyUser);
router.get('/users/delete/:id', user.deleteUser);

//import du middleware pour la verification de token
router.get('/users/:id', verifyToken, user.findOne);
router.get('/users/Admin/:id', verifyAdminToken, user.findOne)

module.exports = router;