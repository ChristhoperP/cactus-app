'use strict'

var express = require('express');

var router = express.Router();
const auth = require('../middlewares/auth');

var UserController = require('../controllers/user');

router.get('/perfil', auth.isAuth, (req, res) => { res.status(200).send({ verification: true, user: req.user, message: 'Tienes acceso' }) }); //prueba resticción de acceso a las rutas
router.post('/registro', auth.noAuth, UserController.registrar);
router.post('/validarUsuario', auth.noAuth, UserController.validarUsuario);
module.exports = router;