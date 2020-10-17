'use strict'

var express = require('express');

var router = express.Router();
const auth = require('../middlewares/auth');
const image = require('../middlewares/images');

var UserController = require('../controllers/user');

router.get('/perfil', auth.isAuth, (req, res) => { res.status(200).send({ verification: true, user: req.user, message: 'Tienes acceso' }) }); //prueba resticción de acceso a las rutas
router.post('/registro', auth.noAuth, UserController.registrar);
router.post('/validarUsuario', auth.noAuth, UserController.validarUsuario);
router.post('/upload-image/:id', image.upload.single('image'), (req, res) => {
    if (req.file) {
        console.log(req.params.id);
        //console.log(req.file);
        console.log(req.file.filename);
        res.send('uploaded');
    } else {
        res.send('no uploaded');
    }
});
router.post('/upload-images/:id', image.upload.array('images', 2), (req, res) => {
        if (req.files) {
            //console.log(req.files);
            console.log(req.params.id);
            req.files.forEach(element => {
                console.log(element.filename);
            });
            res.send('uploaded');
        } else {
            res.send('no uploaded');
        }
    });

module.exports = router;