'use strict'

var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user');

router.get('/home', UserController.home);

module.exports = router;