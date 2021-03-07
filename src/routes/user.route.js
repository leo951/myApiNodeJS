const { Router } = require('express');
const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/users', user.create);
router.post('/users/login', user.login);

//import du middleware pour la verification de token
router.get('/users/:id', verifyToken, user.findOne);

module.exports = router;