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


            return res.status(200).send({ visitantes: parseInt(arregloRes[0]), usuarios: parseInt(arregloRes[1]) });

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
                'SELECT * FROM INFORMACION_INVENTARIO order by idProducto;'
            );

            //console.log(response);
            var respuesta = response.rows;

            var idproductoAnt = 0;
            var idproducto = 0;
            var indiceProducto = 0;
            var especie = [];
            var elementosAEliminar = [];

            respuesta.forEach((element, indice) => {
                idproducto = element.idproducto;//Se obtiene el id del elemento actual
                especie = [];//se establece un arreglo vacio para almacenar la especie
                if (idproducto == idproductoAnt) {//Si el id del elemento actual coincide con el id del elemento anterior:
                    respuesta[indiceProducto].especie.push(element.especie);//La especie del elemento actual se agrega al arreglo del elemento que contiene el indice del producto
                    elementosAEliminar.push(indice);
                } else {
                    //Si no es igual el elemento anterior con el actual:
                    especie.push(element.especie);//la especie actual se almacena en un arreglo
                    element.especie = especie;//la especie del elemento actual se convierte en un arreglo
                    indiceProducto = indice;//se almacena el indice del array que contiene el elemento actual
                    idproductoAnt = idproducto;//el id del elemento actual se convierte en el id del elemento anterior para el siguiente ciclo
                }
            });

            //Se eliminan los elementos que no se necesitan
            var respuesta1=[];
            respuesta.forEach((element, indice) => {
                if(!(elementosAEliminar.indexOf(indice) >= 0)){
                    respuesta1.push(element);
                }
            });

            return res.status(200).send(respuesta1);

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