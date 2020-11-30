'use strict'

var express = require('express');

var router = express.Router();
const auth = require('../middlewares/auth');
const image = require('../middlewares/images');
const conf = require('../config')

var UserController = require('../controllers/user');
var ImageController = require('../controllers/image');
var AdminController = require('../controllers/admin');
var VisitaController = require('../controllers/visita');
var productoController = require('../controllers/producto');
var envioController = require('../controllers/envio');


/* RUTAS DE USUARIO */

//Visitas por mes y usuarios
router.post('/registro-visita-inicio', VisitaController.visitaInicio);
router.post('/registro-visita-fin/:id', VisitaController.visitaFinal);
router.get('/visita-usuario', AdminController.visitaUsuario);

//Informacion del Usuario
router.get('/infoPerfil', auth.isAuth, UserController.infoPerfilUsuario);

router.get('/perfil', auth.isAuth, (req, res) => { res.status(200).send({ verification: true, user: req.user, message: 'Tienes acceso' }) }); //prueba resticción de acceso a las rutas
router.post('/registro', auth.noAuth, UserController.registrar);
router.post('/validarUsuario', auth.noAuth, UserController.validarUsuario);
router.get('/obtenerUsuariosRegistrados', UserController.obtenerUsuariosRegistrados);
router.post('/actualizarInfoUsuario', auth.isAuth, UserController.actualizarInfoUsuarios);
router.get('/historialCompras', auth.isAuth, UserController.historialCompraPorUsuario);

//Subida imagen de perfil
router.post('/upload-image/', auth.isAuth, image.upload.single('image'), image.uploadGoogle, ImageController.subirImagenPerfil);


/* RUTAS DE PRODUCTOS */

//Obtener información de los productos del inventario
router.get('/productoslanding', AdminController.infoProducto);

//llenar informacion de detalle producto
router.get('/detalleproducto/:idproducto', productoController.detalleProducto);


//Obtener información de los productos del inventario
router.get('/productos', auth.isAdmin, AdminController.infoInventario);
router.get('/productosCategoria', auth.isAdmin, AdminController.cantidadCategoria);

//Registrar producto
router.post('/registro-producto', auth.isAdmin, image.upload.fields([{ name: 'portada', maxCount: 1 }, { name: 'gallery', maxCount: 3 }]), image.uploadGoogle,
    AdminController.registroProducto);

// Modificar Producto     
router.post('/actualizarProducto', image.upload.fields([{ name: 'portada', maxCount: 1 }, { name: 'gallery', maxCount: 3 }]), image.uploadGoogle, productoController.actualizarProducto);

// Eliminar producto
router.post('/eliminar-producto', auth.isAdmin, AdminController.eliminarProducto);

// Eliminar producto del carrito 
router.post('/eliminar-producto-carrito', auth.isAuth, AdminController.eliminarProductoCarrito);

//traer la información del carrito
router.get('/productos-carrito', auth.isAuth, AdminController.traerInformacionCarrito);

// Informacion para llenar la tabla de modificar 
router.get('/productoporid/:idproducto', auth.isAdmin, AdminController.infoProductoPorId);

// Informacion para llenar los selects de registrar productos
router.get('/tipos-bases', productoController.getTiposBases);
router.get('/categorias', productoController.getCategorias);
router.get('/especies', productoController.getEspecies);
router.post('/registrarEspecie', productoController.registrarEspecie);
router.get('/generos', productoController.getGenero);
router.get('/familia', productoController.getFamilia);


/* RUTAS DE PROMOCIONES */

// registrar promocion
router.post('/registro-promocion', /* auth.isAdmin, */ AdminController.registroPromocion);

// eliminar promocion
router.post('/eliminar-promocion', /* auth.isAdmin, */ AdminController.eliminarPromocion);

//obtener promociones
router.get('/obtener-promocion', /* auth.isAdmin, */ AdminController.informacionPromociones);

//Modificar una promoción 
router.post('/modificar-promocion', /* auth.isAdmin, */ AdminController.modificarPromocion);

/* RUTAS CARRITO DE COMPRAS */

router.post('/registro-carrito', auth.isAuth, productoController.registroCarrito);

/* RUTAS DE INFORMACION DE ENVIO */
router.get('/departamento', envioController.getDepartamento);
router.get('/municipio', envioController.getMunicipio);
router.get('/agencia-envio', envioController.getAgenciaEnvio);
router.post('/registro-informacion-envio', envioController.registroInfoEnvio);

//Obtener imagenes y eliminar
router.get('/get-image/:image', ImageController.getImageFile);
router.delete('/delete-image/:image', ImageController.DeleteImageFile);

//LANDING PAGE CATEGORIAS 
router.get('/categoriaLanding', productoController.getCategoriasLanding);
module.exports = router;