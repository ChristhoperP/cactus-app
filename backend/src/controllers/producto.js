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
            const response = await conf.pool.query(s);
            res.json(response.rows);

        } catch (e) {
            return res.status(500).send({
                message: 'Error: No se puede obtener las familias'
            });
        }
    },
    detalleProducto: async function(req, res) {

        var { idproducto } = req.params;


        try {
            const response = await conf.pool.query(

                'SELECT * FROM DETALLE_PRODUCTO WHERE IDPRODUCTO = $1;', [idproducto]
            );

            //console.log(response);
            var respuesta = response.rows;

            var idproductoAnt = 0;
            var idproducto1 = 0;
            var indiceProducto = 0;
            var galeria = [];
            var idimagen = [];
            var elementosAEliminar = [];

            respuesta.forEach((element, indice) => {
                idproducto1 = element.idproducto; //Se obtiene el id del elemento actual
                galeria = []; //se establece un arreglo vacio para almacenar la galeria
                if (idproducto1 == idproductoAnt) { //Si el id del elemento actual coincide con el id del elemento anterior:
                    respuesta[indiceProducto].galeria.push(element.galeria); //La galeria del elemento actual se agrega al arreglo del elemento que contiene el indice del producto
                    respuesta[indiceProducto].idimagen.push(element.idimagen); //La galeria del elemento actual se agrega al arreglo del elemento que contiene el indice del producto
                    elementosAEliminar.push(indice);
                } else {
                    //Si no es igual el elemento anterior con el actual:
                    galeria.push(element.galeria); //la galeria actual se almacena en un arreglo
                    idimagen.push(element.idimagen); //la galeria actual se almacena en un arreglo
                    element.galeria = galeria; //la galeria del elemento actual se convierte en un arreglo
                    element.idimagen = idimagen; //la galeria del elemento actual se convierte en un arreglo
                    indiceProducto = indice; //se almacena el indice del array que contiene el elemento actual
                    idproductoAnt = idproducto1; //el id del elemento actual se convierte en el id del elemento anterior para el siguiente ciclo
                }
            });

            //Se eliminan los elementos que no se necesitan
            var respuesta1 = [];
            respuesta.forEach((element, indice) => {
                if (!(elementosAEliminar.indexOf(indice) >= 0)) {
                    respuesta1.push(element);
                }
            });

            return res.status(200).send(respuesta1);


        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No se ha podido obtener los productos por ID.',
            })
        }
    },
    registroCarrito: async function(req, res) {

        var { idproducto, /*  idusuario, */ cantidad } = req.body;


        if (idproducto != null /* && idusuario != null */ && cantidad != null) {

            try {

                /* console.log(req.body, "si recibe"); */
                const response = await conf.pool.query(
                    'SELECT SP_AGREGAR_PRODUCTO_CARRITO($1,$2,$3);', [parseInt(idproducto), parseInt(req.user.id), /* parseInt(idusuario) */ , parseInt(cantidad)]
                );
                console.log('se ha registrado exitosamente en el carrito de compras');
                var respuesta = response.rows[0].sp_agregar_producto_carrito;
                var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
                var arregloRes = respuesta1.split(',');
                var mensaje = arregloRes[1];


                return res.status(200).send({
                    message: mensaje,
                    body: req.body,
                });

            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'Error: No se ha registrado el producto en el carrito de compra',
                })
            }
        } else {
            return res.status(500).send({
                message: 'Error: Faltan campos, no se registro el producto en el carrito de compra'
            })
        }
    },
}

module.exports = controller;