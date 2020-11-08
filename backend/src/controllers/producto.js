'use strict'

const conf = require('../config');
const services = require('../services/token');


var controller = {
    getTiposBases: async function(req, res) {
        const response = await conf.pool.query('SELECT idtipobase, descripcion FROM SP_OBTENER_TIPOSBASES() AS (idtipobase INT, descripcion VARCHAR(100))');
        res.json(response.rows);
    },
    getCategorias: async function(req, res) {
        const response = await conf.pool.query('SELECT idcategoria, descripcion FROM SP_OBTENER_CATEGORIAS_PRODUCTOS() AS (idcategoria INT, descripcion VARCHAR(200));');
        res.json(response.rows);
    },
    getEspecies: async function(req, res) {
        let s = 'SELECT idespecie, descripcion_especie,idgenero, descripcion_genero,idfamilia, descripcion_familia ';
        let f = 'FROM SP_OBTENER_ESPECIES() AS ( idespecie INT , descripcion_especie VARCHAR (200),idgenero INT, descripcion_genero VARCHAR(200),idfamilia INT, descripcion_familia VARCHAR(200))';
        const response = await conf.pool.query(s + f);
        res.json(response.rows);
    },
    registrarEspecie: async function(req, res) {
        var { descripcionEspecie, idGenero } = req.body;

        if (descripcionEspecie != null && idGenero != null) {
            const response = await conf.pool.query('SELECT SP_AGREGAR_ESPECIE($1,$2);', [descripcionEspecie, idGenero]);

            var respuesta = response.rows[0].sp_agregar_especie;
            var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
            var arregloRes = respuesta1.split(',');
            var ocurrioError = arregloRes[0];
            var mensaje = arregloRes[1];
            var idEspecie = arregloRes[2];
            var nombreEspecie = arregloRes[3];

            if (idEspecie) {
                return res.status(200).send({
                    token: services.createToken(idEspecie),
                    nombre: nombreEspecie,
                    message: mensaje,
                    idespecie: idEspecie
                });
            } else {
                return res.status(500).send({
                    message: mensaje
                });
            }
        } else {

            return res.status(500).send({
                message: "Error: campos incompletos"
            });
        }
    },
    actualizarProducto: async function(req, res) {
        var {
            idProducto,
            nombre,
            informacionAdicional,
            precio,
            cantidad,
            idTipoBase,
            tiempoSol,
            frecuenciaRiego,
            tamanio,
            idCategoria,
            especiesProducto,
            eliminadas
        } = req.body;

        var portada = [];
        var galeria = [];

        if (req.files.portada) {
            portada = req.files.portada;
        } else {
            portada[0] = { filename: '' };
        }

        if (req.files.gallery) {
            galeria = req.files.gallery;

            if (galeria.length == 1) {
                galeria[1] = { filename: '' }
                galeria[2] = { filename: '' }
            } else if (galeria.length == 2) {
                galeria[2] = { filename: '' }
            }
        } else {
            galeria[0] = { filename: '' }
            galeria[1] = { filename: '' }
            galeria[2] = { filename: '' }
        }
        if (idProducto == null || idTipoBase == null || idCategoria == null) {
            return res.status(500).send({
                message: "Error: campos incompletos"
            });
        } else {
            try {

                const responseUpdate = await conf.pool.query('SELECT SP_MODIFICAR_PRODUCTO($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16);', [idProducto, nombre, informacionAdicional, portada[0].filename, precio, cantidad, idTipoBase, tiempoSol, frecuenciaRiego, tamanio, idCategoria, especiesProducto,
                    eliminadas, galeria[0].filename, galeria[1].filename, galeria[2].filename
                ]);
                console.log(eliminadas);



                var respuesta = responseUpdate.rows[0].sp_modificar_producto;
                var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
                var arregloRes = respuesta1.split(',');
                var ocurrioError = arregloRes[0];
                var mensaje = arregloRes[1];
                return res.status(200).send({
                    message: mensaje
                });
            } catch (e) {
                console.log(e);
                return res.status(500).send({
                    message: 'Error: producto no actualizado'
                });
            }

        }
    },
    getGenero: async function(req, res) {
        let s = 'SELECT idgenero, descripcion_genero,idfamilia, descripcion_familia ';
        let f = 'FROM SP_OBTENER_GENERO() AS ( idgenero INT, descripcion_genero VARCHAR(200),idfamilia INT, descripcion_familia VARCHAR(200));';
        const response = await conf.pool.query(s + f);
        res.json(response.rows);
    },
    getFamilia: async function(req, res) {
        try {
            let s = 'SELECT idfamilia, descripcion_familia FROM SP_OBTENER_FAMILIA() AS ( idfamilia INT, descripcion_familia VARCHAR(200));';
            const response = await pool.query(s);
            res.json(response.rows);

        } catch (e) {
            return res.status(500).send({
                message: 'Error: No se puede obtener las familias'
            });
        }
    },
}

module.exports = controller;
//Prueba
/*
{
    "idproducto": 1,       
    "nombre": "Echeveria Super Boom",
    "informacionadicional": "lorem",
    "urlportada": "Ninguna 123",
    "precio": 220,
    "cantidad": 2,
    "idtipobase": 12,
    "tiemposol": "7:00am-11:00am",
    "frecuenciariego": "2 veces por semana",
    "tamanio": "8x12cm",
    "idcategoria": 2
}
*/