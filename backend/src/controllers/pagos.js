'use strict'

const { json } = require('body-parser');
const conf = require('../config');
const stripe = require('stripe')('sk_test_51Hm92eAIJI4gLSIFW9kUZCb2OheUEKVRFzPTWk2RfdfReqV7n9AVD6nOQ1xv6MbOUts3SXCypeDdUTq6kEx4OzW400DcWGsZ0O');

var controller = {

    setPago: async function (req, res) {
        console.log(req.body);

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
                amount: req.body[2]*100,
                currency: 'HNL',
                customer: customer.id,
                description: 'Compra de prueba'
            });

            console.log(charge.id);

            // FInal Show a sucess views
            //res.render('downloads');

            return res.status(200).send({
                message: 'datos recibidos, pago realizado.'
            });

        } catch (error) {
            return res.status(500).send({
                message: 'Error: no se pudo tramitar el pago.'
            });
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
            return res.status(200).send('{"subtotal": ' + subTotal + ',"envio": ' + envio + ',"total":' + (subTotal + envio) + '}');
        } else {
            console.log("No hay cantidad disponible para su compra");

            return res.status(404).send('{"Error": "No hay cantidad disponible para su compra"}');
        }
    },
}

module.exports = controller;