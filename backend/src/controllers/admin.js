'use strict'

const conf = require('../config');


var controller = {
    visitaUsuario: async function(req, res) {
        try {
            const response = await conf.pool.query(
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
    infoInventario: async function(req, res) {
        try {
            const response = await conf.pool.query(
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
                idproducto = element.idproducto; //Se obtiene el id del elemento actual
                especie = []; //se establece un arreglo vacio para almacenar la especie
                if (idproducto == idproductoAnt) { //Si el id del elemento actual coincide con el id del elemento anterior:
                    respuesta[indiceProducto].especie.push(element.especie); //La especie del elemento actual se agrega al arreglo del elemento que contiene el indice del producto
                    elementosAEliminar.push(indice);
                } else {
                    //Si no es igual el elemento anterior con el actual:
                    especie.push(element.especie); //la especie actual se almacena en un arreglo
                    element.especie = especie; //la especie del elemento actual se convierte en un arreglo
                    indiceProducto = indice; //se almacena el indice del array que contiene el elemento actual
                    idproductoAnt = idproducto; //el id del elemento actual se convierte en el id del elemento anterior para el siguiente ciclo
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
                message: 'Error: No se ha podido obtener los productos.',
            })
        }
    },
    infoProducto: async function(req, res) {
        try {
            const response = await conf.pool.query(
                'SELECT * FROM INFORMACION_PRODUCTO order by idProducto;'
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
    cantidadCategoria: async function(req, res) {
        try {
            const response = await conf.pool.query(
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
    infoProductoPorId: async function(req, res) {
        //var { idproducto } = req.body;
        var idproducto = req.params.idproducto;

        try {
            const response = await conf.pool.query(
                /* 'SELECT * FROM MODIFICAR_INVENTARIO WHERE IDPRODUCTO = 43;' */
                'SELECT * FROM MODIFICAR_INVENTARIO WHERE IDPRODUCTO = $1;', [idproducto]
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


    registroProducto: async function(req, res, next) {


        var { nombre, informacionadicional, precio, cantidad, tipobase, tiemposol, frecuenciariego, tamanio, categoria, especie } = req.body;
        //console.log(nombre, informacionadicional, precio, cantidad, tipobase, tiemposol, frecuenciariego, tamanio, categoria, especie);
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

        /*  for (let galeria of req.files.gallery[0].filename) {
             console.log(galeria);
         }
  */
        //console.log(portada[0]);
        //console.log(galeria[0]);
        if (nombre != null && informacionadicional != null && precio != null && cantidad != null && tipobase != null && tiemposol != null &&
            frecuenciariego != null && tamanio != null && categoria != null && especie != null) {

            try {

                console.log(req.body);
                const response = await conf.pool.query(
                    'SELECT SP_AGREGAR_PRODUCTO($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14);', [nombre, parseInt(categoria), parseInt(tipobase), parseInt(especie), parseInt(cantidad), parseFloat(precio), tiemposol, frecuenciariego, tamanio, informacionadicional, portada[0].filename, galeria[0].filename, galeria[1].filename, galeria[2].filename]
                );
                console.log('se ha registrado exitosamente');
                var respuesta = response.rows[0].sp_agregar_producto;
                var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
                var arregloRes = respuesta1.split(',');
                var ocurrioError = arregloRes[0];
                var mensaje = arregloRes[1];
                var idProducto = arregloRes[2];

                return res.status(200).send({
                    message: mensaje,
                    files: req.files,
                    body: req.body,
                    idProducto: idProducto
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
    },

    eliminarProducto: async function(req, res) {
        var { idproducto } = req.body;

        if (idproducto != null) {

            try {
                const response = await conf.pool.query(
                    'SELECT SP_ELIMINAR_PRODUCTO ($1);', [parseInt(idproducto)]
                );


                return res.status(200).send({ message: "producto eliminado con exito" });

            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'Error: No se ha podido eliminar el producto',
                })
            }
        } else {
            return res.status(500).send({
                message: 'Error: campo incompleto no recupera el id',
            })
        }

    },

    registroPromocion: async function(req, res) {


        var { idproducto, descripcion, fechainicio, fechafin, porcentajedescuento } = req.body;
        console.log(idproducto, descripcion, fechainicio, fechafin, porcentajedescuento);

        if (idproducto != null && descripcion != null && fechainicio != null && porcentajedescuento != null) {

            try {

                console.log(req.body, "si recibe");
                const response = await conf.pool.query(
                    'SELECT SP_AGREGAR_PROMOCION($1,$2,$3,$4,$5);', [parseInt(idproducto), descripcion, fechainicio, fechafin, parseFloat(porcentajedescuento)]
                );
                console.log('se ha registrado exitosamente');
                var respuesta = response.rows[0].sp_agregar_promocion;
                var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
                var arregloRes = respuesta1.split(',');
                var mensaje = arregloRes[1];
                var idPromocion = arregloRes[2];

                return res.status(200).send({
                    message: mensaje,
                    body: req.body,
                    idPromocion: idPromocion
                });

            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'Error: No se ha registrado la promocion, el producto ya tiene un ID asignado',
                })
            }
        } else {
            return res.status(500).send({
                message: 'Error: Faltan campos, no se registro la promocion'
            })
        }
    },

    eliminarPromocion: async function(req, res) {
        var { idpromocion } = req.body;

        if (idpromocion != null) {

            try {
                const response = await conf.pool.query(
                    'SELECT SP_ELIMINAR_PROMOCION ($1);', [parseInt(idpromocion)]
                );


                return res.status(200).send({ message: "promocion eliminada con exito" });

            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'Error: No se ha podido eliminar la promocion',
                })
            }
        } else {
            return res.status(500).send({
                message: 'Error: campo incompleto no recupera el id',
            })
        }

    },
    informacionPromociones: async function(req, res) {
        try {
            const response = await conf.pool.query('SELECT promocion_idpromocion,idproducto , nombre , precio, porcentajedescuento, precioConDescuento, fechafin,urlportada, idcategoria, nombreCategoria FROM INFORMACION_PROMOCIONES;');
            var respuesta = response.rows;
            return res.status(200).send(respuesta);
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No es posible obtener las promociones disponibles.',
            })
        }
    },
    modificarPromocion: async function(req, res) {
        var { idpromocion, fechafin, porcentajedescuento } = req.body;
        if (idpromocion != null) {
            try {
                console.log(req.body);
                var a = 'SELECT promocion_idpromocion, idproducto, nombre , precio, porcentajedescuento, precioConDescuento, fechafin'
                var b = ' FROM SP_MODIFICAR_PROMOCION($1,$2,$3) AS ( promocion_idpromocion INT, idproducto INT, nombre VARCHAR(45), precio NUMERIC, porcentajedescuento NUMERIC, precioConDescuento NUMERIC, fechafin DATE);'
                var c = a + b;
                const response = await conf.pool.query(c, [parseInt(idpromocion), fechafin, parseFloat(porcentajedescuento)]);
                var respuesta = response.rows;
                return res.status(200).send({
                    respuesta
                });

            } catch (err) {
                console.log(err);
                return res.status(500).send({
                    message: 'Error: No se ha modificado la promocion',
                })
            }
        } else {
            return res.status(500).send({
                message: 'Error: Faltan campos'
            })
        }
    }
};

module.exports = controller;