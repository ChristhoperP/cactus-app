'use strict'

const { request } = require('express');
const { pool } = require('../conexion');
const rutas = require('../config');
var fs = require('fs');
var path = require('path');

var controller = {
    subirImagen: async function (req, res)  {
        if (req.file) {
            console.log(req.params.id);
            //console.log(req.file);
            console.log(req.file.filename);
            res.send('uploaded');
        } else {
            res.send('no uploaded');
        }
    },

    subirImagenes: async function  (req, res) {
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
    },

    getImageFile: function(req, res){
        var file = req.params.image;
        var path_file = './src/public/uploads/'+file;

        fs.stat(path_file, (err)=>{
            if(!err){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        })
    }
};



module.exports = controller;