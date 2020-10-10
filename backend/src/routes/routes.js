'use strict'

var express = require('express');

var router = express.Router();
const auth = require('../middlewares/auth');

var UserController = require('../controllers/user');


router.get('/home', UserController.home);
router.get('/verificatoken', auth.isAuth, (req, res) => { res.status(200).send({ verification: true, user: req.user, message: 'Tienes acceso' }) }); //prueba resticción de acceso a las rutas
router.post('/registro', UserController.registrar);
module.exports = router;