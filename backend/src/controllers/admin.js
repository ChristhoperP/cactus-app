'use strict'

const { pool } = require('../conexion');
const bcrypt = require('bcrypt');
const rutas = require('../config');
const services = require('../services/token');
const image = require('../middlewares/images');
var ImageController = require('../controllers/image');

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
    },

    infoProductoPorId: async function (req, res) {
        var {idproducto} = req.body;
        try {
            const response = await pool.query(
                'SELECT * FROM MODIFICAR_INVENTARIO WHERE IDPRODUCTO = $1;', [idproducto]
            );

            
            var respuesta = response.rows;

            return res.status(200).send(respuesta);

        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No se ha podido la cantidad de productos por categoria disponibles.',
            })
        }
    },
    
    registroProducto: async function  (req, res) {
       
        image.upload.fields([{ name: 'portada', maxCount: 1 },{ name: 'gallery', maxCount: 3 }]),
                res.status(200).send( {files: req.files, body:req.body}) 
                
               


        var {nombre, informacionadicional,precio,cantidad,TipoBase,Tiemposol,frecuenciariego,tamanio,categoria,especie,galeriaproducto} = req.body;
        var{portada} =req.files.portada[0].filename;

        for (let galeria of req.files.gallery[0].filename) {
            console.log(galeria);
        }

        if (nombre != null && informacionadicional != null && precio != null && cantidad != null && TipoBase != null&& Tiemposol != null
            && frecuenciariego != null && tamanio != null && categoria != null && especie != null) {

                
                try {
                    
                    const response = await pool.query(
                        'SELECT SP_AGREGAR_PRODUCTO($1,$2,$3,$4,$5,$6,$7,$8,$9,$9,$10,$11,$12);', [nombre, categoria, TipoBase, especie, cantidad, precio, Tiemposol, frecuenciariego, tamanio, informacionadicional,portada,galeria]
                    );

                    var respuesta = response.rows[0].sp_agregar_producto;
                    var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
                    var arregloRes = respuesta1.split(',');
                    var ocurrioError = arregloRes[0];
                    var mensaje = arregloRes[1];
                    var idProducto = arregloRes[2];

                    return res.status(500).send({
                        message: mensaje
                        
                    });

                } catch (err) {
                    console.log(err);
                    return res.status(500).send({
                        message: 'Error: No se ha registrado el producto',
                    })
                }
            
        } else {
            return res.status(500).send({
                message: 'Error: Faltan campos, no se registro el producto'
            })
        }
        

            
    
    }

};

module.exports = controller;