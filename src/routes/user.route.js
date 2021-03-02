const { Router } = require('express');
const express = require('express');
const router = express.Router();
const user = require('../controllers/users.controller');

router.post('/users', user.create);
router.post('/users/login', user.login);
router.get('/users/:id', user.findOne);


module.exports = router;