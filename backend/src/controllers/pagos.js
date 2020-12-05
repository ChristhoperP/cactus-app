'use strict'

const { json } = require('body-parser');
const conf = require('../config');
const stripe = require('stripe')('sk_test_51Hm92eAIJI4gLSIFW9kUZCb2OheUEKVRFzPTWk2RfdfReqV7n9AVD6nOQ1xv6MbOUts3SXCypeDdUTq6kEx4OzW400DcWGsZ0O');

var controller = {

    setPago: async function (req, res) {
        //console.log(req.body);
        var sendRespuesta = JSON.parse('{"mensaje": "", "infoenvio":"", "pedido":""}');

        //Obtener el email del cliente
        const response = await conf.pool.query(
            `SELECT correo FROM usuario WHERE idusuario = ${req.user.id};`
        );

        try {
            const customer = await stripe.customers.create({
                email: response.rows[0].correo,
                source: req.body[1].stripeToken
            });

            const charge = await stripe.charges.create({
                amount: req.body[2] * 100,
                currency: 'HNL',
                customer: customer.id,
                description: 'Compra de prueba'
            });

            console.log(charge.id);
            //var charge = JSON.parse('{"id": "prueba"}');

            //En caso de que el pago se haya realizado en Stripe
            if (charge.id) {
                //Registrar la informacion de envio y recibir el id
                let p_ocurrioerror;
                let p_mensaje;
                let p_id;

                const response = await conf.pool.query(
                    'SELECT sp_registrar_infoenvio($1,$2,$3,$4,$5);',
                    [req.body[0].nombre,
                    req.body[0].direccion,
                    req.body[0].domicilio,
                    req.body[0].agencia,
                    req.body[0].municipio]
                );

                var respuesta = response.rows[0].sp_registrar_infoenvio;
                var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
                var arregloRes = respuesta1.split(',');
                p_ocurrioerror = arregloRes[0];
                p_mensaje = arregloRes[1];
                p_id = arregloRes[2];

                //console.log(p_ocurrioerror, p_mensaje, p_id);
                //p_ocurrioerror = 0;
                if (p_ocurrioerror == 0) {
                    //Se reporta que el registro de la informacion de envio fue exitoso
                    sendRespuesta.infoenvio = 'La información del envío se registró exitosamente.';

                    //Crear el arreglo con los productos y cantidad
                    let productos = [];

                    JSON.parse(req.body[3]).forEach(element => {
                        productos.push([element.idproducto, element.cantidad]);
                    });
                    //console.log(productos);

                    //Registrar el pedido
                    const response = await conf.pool.query(
                        'SELECT sp_registrar_pedido($1,$2,$3,$4,$5);',
                        [req.body[2],//total
                            'pendiente',//estado
                            p_id,//idenvio
                        req.user.id,//idusuario
                            productos]//productos[]
                    );

                    var respuesta = response.rows[0].sp_registrar_pedido;
                    var respuesta1 = respuesta.substring(1, respuesta.length - 1).replace('"', '').replace('"', '');
                    var arregloRes = respuesta1.split(',');
                    p_ocurrioerror = arregloRes[0];
                    let p_mensajepedido = arregloRes[1];
                    let p_mensajeproductos = arregloRes[2];
                    p_id = arregloRes[3];

                    if (p_ocurrioerror == 0) {
                        //Se reporta que el registro del pedido tuvo exito
                        sendRespuesta.pedido = 'La información del pedido se registró exitosamente.';
                    }else{
                        //Se reporta que el registro del pedido no tuvo exito
                        sendRespuesta.pedido = 'Error: La información del pedido no se registró exitosamente.';
                    }
                }else{
                    //Se reporta que el registro de la informacion de envio no fue exitoso
                    sendRespuesta.infoenvio = 'Error: La información del envío no se registró exitosamente.';
                }

            } else {
                sendRespuesta.mensaje = 'Error: no se pudo tramitar el pago.';
                return res.status(500).send(sendRespuesta);
            }

            //El pago tuvo exito.
            sendRespuesta.mensaje = 'datos recibidos, pago realizado.';
            return res.status(200).send(sendRespuesta);

        } catch (error) {
            console.log(error);
            //ocurrio un error durante el pago
            sendRespuesta.mensaje = 'Error: no se pudo tramitar el pago.';
            return res.status(500).send(sendRespuesta);
        }
    },

    getMonto: async function (req, res) {

        //console.log(req.body[0]);//productos
        //console.log(req.body[1]);//agencia

        var productos = JSON.parse(req.body[0]);
        var condicion = "";
        productos.forEach(element => {
            condicion = condicion.concat("(idproducto = " + element.idproducto + " AND cantidad >= " + element.cantidad + ")");
            if (!(productos.indexOf(element) == productos.length - 1)) {
                condicion = condicion.concat(" OR ");
            }
        });

        let consulta = 'SELECT idproducto, nombre,precio,preciocondescuento, cantidad FROM PRODUCTOS_Y_PROMOCIONES WHERE ' + condicion + ';';
        let subTotal = 0;
        let envio = 0;
        let respuesta = await conf.pool.query(consulta);
        let cantidad = 0;

        if (respuesta.rows.length == productos.length) {
            console.log("Las cantidades coinciden");
            respuesta.rows.forEach(element => {
                if (element.preciocondescuento) {

                    cantidad = 0
                    for (let index = 0; index < productos.length; index++) {
                        let element2 = productos[index];
                        if (element2.idproducto == element.idproducto) {
                            cantidad = element2.cantidad;
                        }
                    }

                    subTotal += parseFloat((element.preciocondescuento * cantidad).toFixed(2));
                } else {
                    cantidad = 0
                    for (let index = 0; index < productos.length; index++) {
                        let element2 = productos[index];
                        if (element2.idproducto == element.idproducto) {
                            cantidad = element2.cantidad;
                        }
                    }
                    subTotal += parseFloat((element.precio * cantidad).toFixed(2));
                }
            });

            consulta = 'SELECT PRECIO FROM AGENCIAENVIO WHERE IDAGENCIAENVIO = ' + req.body[1];
            respuesta = await conf.pool.query(consulta);

            envio = respuesta.rows[0].precio;
            return res.status(200).send('{"subtotal": ' + subTotal + ',"envio": ' + envio + ',"total":' + (parseFloat(subTotal) + parseFloat(envio)) + '}');
        } else {
            console.log("No hay cantidad disponible para su compra");

            return res.status(404).send('{"Error": "No hay cantidad disponible para su compra"}');
        }
    },
}

module.exports = controller;