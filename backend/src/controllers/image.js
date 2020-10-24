'use strict'

const { request } = require('express');
const { pool } = require('../conexion');
const rutas = require('../config');
var fs = require('fs');
var path = require('path');

var controller = {
    subirImagenPerfil: async function (req, res) {
        if (req.file) {
            console.log(req.user.id);
            //console.log(req.file);
            //console.log(req.file.filename);
            try {
                const response = await pool.query(`UPDATE public.usuario SET imagenperfil='${req.file.filename}' WHERE idusuario=${req.user.id};`);

                return res.status(200).send(req.file.filename);
            } catch (error) {
                console.log(error);
                return res.status(500).send({
                    message: 'No se ha podido obtener subir la imagen',
                })
            }
        } else {
            res.status(500).send('No se subió la imagen.');
        }
    },

    getImageFile: function (req, res) {
        var file = req.params.image;
        var path_file = './src/public/uploads/' + file;

        fs.stat(path_file, (err) => {
            if (!err) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        })
    },

    DeleteImageFile: function (req, res) {
        var file = req.params.image;
        var path_file = './src/public/uploads/' + file;

        fs.unlink(path_file, (err) => {
            if (err) {
                return res.status(404).send({ error: "Imagen no encontrada." });
            } else {
                return res.status(200).send({
                    message: "Imagen borrada con exito."
                });
            }
        })
    }
};



module.exports = controller;