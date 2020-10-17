'use strict'

const { request } = require('express');
const { pool } = require('../conexion');
const rutas = require('../config');

var controller = {
    SubirImagen: async function (req, res)  {
        if (req.file) {
            console.log(req.params.id);
            //console.log(req.file);
            console.log(req.file.filename);
            res.send('uploaded');
        } else {
            res.send('no uploaded');
        }
    },

    SubirImagenes: async function  (req, res) {
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
    }
};



module.exports = controller;