'use strict'

var express = require('express');

var router = express.Router();
const auth = require('../middlewares/auth');
const image = require('../middlewares/images');

var UserController = require('../controllers/user');
var ImageController = require('../controllers/image');
var AdminController = require('../controllers/admin');
var VisitaController = require('../controllers/visita');
var productoController = require('../controllers/producto');

router.get('/perfil', auth.isAuth, (req, res) => { res.status(200).send({ verification: true, user: req.user, message: 'Tienes acceso' }) }); //prueba resticción de acceso a las rutas
router.post('/registro', auth.noAuth, UserController.registrar);
router.post('/validarUsuario', auth.noAuth, UserController.validarUsuario);


//Subida de imagenes
router.post('/upload-image/:id', image.upload.single('image'), ImageController.subirImagen);
router.post('/upload-images/:id', image.upload.array('images', 2), ImageController.subirImagenes);


// Informacion para llenar los selects de registrar productos
router.get('/tipos-bases', productoController.getTiposBases);
router.get('/categorias', productoController.getCategorias);
router.get('/especies', productoController.getEspecies);
router.post('/registrarEspecie', productoController.registrarEspecie);



//Visitas por mes y usuarios
router.post('/registro-visita-inicio', VisitaController.visitaInicio);
router.post('/registro-visita-fin/:id', VisitaController.visitaFinal);
router.get('/visita-usuario', AdminController.visitaUsuario);

//Informacion del Usuario
router.get('/infoPerfil', auth.isAuth, UserController.infoPerfilUsuario);

//Obtener información de los productos del inventario
router.get('/productos', auth.isAdmin, AdminController.infoInventario);
router.get('/productosCategoria', auth.isAdmin, AdminController.cantidadCategoria);

module.exports = router;