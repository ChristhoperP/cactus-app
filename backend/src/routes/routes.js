'use strict'

var express = require('express');

var router = express.Router();
const auth = require('../middlewares/auth');
const image = require('../middlewares/images');

var UserController = require('../controllers/user');
var ImageController = require('../controllers/image');

router.get('/perfil', auth.isAuth, (req, res) => { res.status(200).send({ verification: true, user: req.user, message: 'Tienes acceso' }) }); //prueba resticción de acceso a las rutas
router.post('/registro', auth.noAuth, UserController.registrar);
router.post('/validarUsuario', auth.noAuth, UserController.validarUsuario);
router.post('/upload-image/:id', image.upload.single('image'), ImageController.SubirImagen);
router.post('/upload-images/:id', image.upload.array('images', 2), ImageController.SubirImagenes);
   

module.exports = router;