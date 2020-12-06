'use strict'

const conf = require('../config');
const services = require('../services/token');


var controller = {

    reporteUsuario: async function(req, res) {

        const response = await conf.pool.query(`SELECT * FROM REPORTE_USUARIO`);
        /* res.json(response.rows); */

        var respuesta = response.rows;

        var idusuarioAnt = 0;
        var idusuario1 = 0;
        var indiceusuario = 0;
        var idpedido = [];
        var fechapedido = [];
        var elementosAEliminar = [];

        respuesta.forEach((element, indice) => {
            idusuario1 = element.idusuario; //Se obtiene el id del elemento actual
            idpedido = []; //se establece un arreglo vacio para almacenar la idpedido
            if (idusuario1 == idusuarioAnt) { //Si el id del elemento actual coincide con el id del elemento anterior:
                respuesta[indiceusuario].idpedido.push(element.idpedido); //La idpedido del elemento actual se agrega al arreglo del elemento que contiene el indice del usuario
                respuesta[indiceusuario].fechapedido.push(element.fechapedido); //La idpedido del elemento actual se agrega al arreglo del elemento que contiene el indice del usuario
                elementosAEliminar.push(indice);
            } else {
                //Si no es igual el elemento anterior con el actual:
                idpedido.push(element.idpedido); //la idpedido actual se almacena en un arreglo
                fechapedido.push(element.fechapedido); //la idpedido actual se almacena en un arreglo
                element.idpedido = idpedido; //la idpedido del elemento actual se convierte en un arreglo
                element.fechapedido = fechapedido; //la idpedido del elemento actual se convierte en un arreglo
                indiceusuario = indice; //se almacena el indice del array que contiene el elemento actual
                idusuarioAnt = idusuario1; //el id del elemento actual se convierte en el id del elemento anterior para el siguiente ciclo
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
    },
    reporteInventario: async function(req, res) {
            
            const response = await conf.pool.query(`SELECT * FROM REPORTE_INVENTARIO`);
            /* res.json(response.rows); */

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
    },
    reporteVentas: async function(req, res) {
        try {
            const response = await conf.pool.query('SELECT * FROM REPORTE_VENTAS order by idProducto;');
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
                message: 'Error: No se puede obtener esta información'
            })
        }
    },
    ingresosPorMes: async function(req, res) {
        try {
            const response = await conf.pool.query('SELECT * FROM INGRESOS_POR_MES order by fecha;');
            var respuesta = response.rows;

            return res.status(200).send({
                respuesta
            })
        } catch (err) {
            console.log(err);
            return res.status(500).send({
                message: 'Error: No se puede obtener esta información'
            })
        }
    },

    reporteIngresos: async function(req, res) {
                   
                try {

                         const response1 = await conf.pool.query(
                        `SELECT (date_part('year', fechapedido)) AS IngresosPorAnio, sum(total) AS ventasXanio
                        FROM pedido
                        Group by IngresosPorAnio;`);
                         var IngresosPorAnio = response1.rows;   


                        const response2 = await conf.pool.query(`
                        SELECT to_char(fechapedido, 'YYYY-MM') AS IngresosPorMes, sum(total) AS ventasXmes
                        FROM pedido
                        Group by IngresosPorMes;`);
                        var IngresosPorMes = response2.rows;  
                    
                
                    return res.status(200).send({
                        IngresosPorAnio: IngresosPorAnio,
                        IngresosPorMes: IngresosPorMes 
                    });
        
        
                } catch (err) {
                    return res.status(500).send({
                        message: 'Error: No se puede obtener esta información'
                    })
                }
        }    
    
};

module.exports = controller;