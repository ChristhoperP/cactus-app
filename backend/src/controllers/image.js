'use strict'

const { request } = require('express');
const { pool } = require('../conexion');
const configuracion = require('../config');
var fs = require('fs');
var path = require('path');

const { Storage } = require('@google-cloud/storage');


var controller = {
    subirImagenPerfil: async function (req, res) {
        if (req.file) {
            //Almacenar el nombre de la imagen en la base de datos
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
        var path_file = `https://storage.googleapis.com/${configuracion.bucketName}/` + file;
        //console.log(path_file);
        /* fs.stat(path_file, (err) => {
            if (!err) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        }) */

        return res.redirect(path_file);
    },

    DeleteImageFile: async function (req, res) {
        /* var file = req.params.image;
        var path_file = './src/public/uploads/' + file;

        fs.unlink(path_file, (err) => {
            if (err) {
                return res.status(404).send({ error: "Imagen no encontrada." });
            } else {
                return res.status(200).send({
                    message: "Imagen borrada con exito."
                });
            }
        }); */

        // Creates a client
        const storage = new Storage({
            keyFilename: 'cactus.json'
        });

        const bucketName=configuracion.bucketName;
        const filename=req.params.image;

        try {
            // Deletes the file from the bucket
            await storage.bucket(bucketName).file(filename).delete();

            return res.status(200).send({message: `gs://${bucketName}/${filename} deleted.`});
        } catch (err) {
            return res.status(404).send({ error: "Imagen no encontrada." });
        }
    }
};



module.exports = controller;