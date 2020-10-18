'use strict'

const { pool } = require('../conexion');
const bcrypt = require('bcrypt');
const rutas = require('../config');
const services = require('../services/token');

var controller = {
    visitaUsuario: async function (req, res) {
        try {
            const response = await pool.query(
                'SELECT SP_OBTENER_VISITA_USUARIO();'
            );

            //console.log(response);
            var respuesta = response.rows[0].sp_obtener_visita_usuario;


            var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
            var arregloRes = respuesta1.split(',');


            return res.status(200).send({visitantes: parseInt(arregloRes[0]), usuarios: parseInt(arregloRes[1])});

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No se ha podido obtener las visitas y los usuarios',
            })
        }
    },
    infoInventario: async function (req, res) {
        try {
            const response = await pool.query(
                'SELECT * FROM INFORMACION_INVENTARIO;'
            );

            //console.log(response);
            var respuesta = response.rows;

            return res.status(200).send(respuesta);

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No se ha podido obtener los productos.',
            })
        }
    },
    cantidadCategoria: async function (req, res) {
        try {
            const response = await pool.query(
                'SELECT * FROM CANTIDAD_INVENTARIO_POR_CATEGORIA;'
            );

            //console.log(typeof(response.rows));
            var respuesta = response.rows;

            return res.status(200).send(respuesta);

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No se ha podido la cantidad de productos por categoria disponibles.',
            })
        }
    }

};

module.exports = controller;