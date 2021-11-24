'use strict';

var router = require('express').Router();
const loginController = require('../controllers/LoginController');

router.post('/login', loginController.LoginPost);

module.exports = router;